<?php
namespace app\modules\v1\controllers;

use Yii;

use yii\data\ActiveDataProvider;
use yii\filters\AccessControl;
use yii\filters\auth\CompositeAuth;
use app\filters\auth\HttpBearerAuth;
use yii\helpers\Url;
//use yii\rest\ActiveController;
use app\controllers\RestController;
use yii\web\HttpException;
use yii\web\NotFoundHttpException;
use yii\web\ServerErrorHttpException;
use app\models\Setting;

class SettingController extends RestController
{
    public $modelClass = 'app\models\Setting';

    public function __construct($id, $module, $config = [])
    {
        parent::__construct($id, $module, $config);

    }

    public function actions()
    {
        return [];
    }

    public function behaviors()
    {
        $behaviors = parent::behaviors();

        $behaviors['verbs'] = [
            'class' => \yii\filters\VerbFilter::className(),
            'actions' => [
                'index'  => ['get'],
                'view'   => ['get'],
                'create' => ['post'],
                'update' => ['put'],
                'delete' => ['delete'],
                'public' => ['get'],
            ],
        ];

        // avoid authentication on CORS-pre-flight requests (HTTP OPTIONS method)
        $behaviors['authenticator']['except'][] = 'public';

		// setup access
		$behaviors['access'] = [
			'class' => AccessControl::className(),
            'only' => ['index', 'view', 'create', 'update', 'delete'], //only be applied to
            'rules' => [
                [
                    'allow' => true,
                    'actions' => ['index', 'view', 'create', 'update', 'delete'],
                    'roles' => ['admin', 'manageSettings'],
                ],
            ],
		];

        return $behaviors;
    }

    public function actionIndex() {
        $authHeader = \Yii::$app->getRequest()->getHeaders()->get('Authorization');
        //return $authHeader;

        return new ActiveDataProvider([
            'query' =>  Setting::find()->where([
                'status'    =>  1,
            ])
        ]);
    }

    public function actionView($id){
        $setting = Setting::find()->where([
            'id'    =>  $id,
            'status'    =>  1,
        ])->one();
        if($setting){
            return $setting;
        } else {
            throw new NotFoundHttpException("Object not found: $id");
        }
    }

    public function actionCreate(){
        $model = new Setting();

        $bodyParam = \Yii::$app->getRequest()->getBodyParams();
        if(isset($bodyParam['meta_key'])) {
            $bodyParam['meta_key'] = strtolower($bodyParam['meta_key']);
        }
        $model->load($bodyParam, '');
        if ($model->validate() && $model->save()) {
            $response = \Yii::$app->getResponse();
            $response->setStatusCode(201);
            $id = implode(',', array_values($model->getPrimaryKey(true)));
            $response->getHeaders()->set('Location', Url::toRoute([$id], true));
        } else {
            // Validation error
            throw new HttpException(422, json_encode($model->errors));
        }


        return $model;
    }

    public function actionUpdate($id) {
        $model = $this->actionView($id);

        $bodyParams = \Yii::$app->getRequest()->getBodyParams();
        if(isset($bodyParam['meta_key'])) {
            $bodyParam['meta_key'] = strtolower($bodyParam['meta_key']);
        }
        $model->load($bodyParams, '');

        if ($model->validate() && $model->save()) {
            $response = \Yii::$app->getResponse();
            $response->setStatusCode(200);
        } else {
            // Validation error
            throw new HttpException(422, json_encode($model->errors));
        }

        return $model;
    }

    public function actionDelete($id) {
        $model = $this->actionView($id);

        if ($model->delete() === false) {
            throw new ServerErrorHttpException('Failed to delete the object for unknown reason.');
        }

        $response = \Yii::$app->getResponse();
        $response->setStatusCode(204);
        return "ok";

    }

    public function actionPublic(){
        $publicSettings = [];

        $settings = Setting::find()->where([
            'is_public' =>  1,
            'status'    =>  1,
        ])->all();

        if($settings) {
            foreach($settings as $settingKey => $setting) {
                $publicSettings[] = [
                    'meta_key'      => $setting['meta_key'],
                    'meta_type'     => $setting['meta_type'],
                    'meta_value'    => $setting['meta_value']
                ];
            }
        }

        return $publicSettings;
    }



    public function actionOptions($id = null) {
        return "ok";
    }
}