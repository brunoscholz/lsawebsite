<?php
namespace app\modules\v1\controllers;

use app\filters\auth\HttpBearerAuth;
use Yii;

use yii\data\ActiveDataProvider;
use yii\filters\AccessControl;
use yii\filters\auth\CompositeAuth;
use yii\helpers\Url;
use app\controllers\RestController;

use yii\web\HttpException;
use yii\web\NotFoundHttpException;
use yii\web\ServerErrorHttpException;

use app\models\Instructor;
use app\modules\v1\models\InstructorModel;
use app\models\User;
use app\components\RestUtils;

class InstructorController extends RestController
{
    public $modelClass = 'app\models\Instructor';

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
            ],
                //'me'    =>  ['get', 'post'],
        ];

        // avoid authentication on CORS-pre-flight requests (HTTP OPTIONS method)
        //$behaviors['authenticator']['except'] = ['options']; //'assign'

        // setup access
        $behaviors['access'] = [
	        'class' => AccessControl::className(),
	        'only' => ['index', 'view', 'create', 'update', 'delete'], //only be applied to
	        'rules' => [
		        [
			        'allow' => true,
			        'actions' => ['create', 'update', 'delete'],
			        'roles' => ['admin', 'manageUsers'],
		        ],
                [
                    'allow' => true,
                    'actions' => ['index', 'view'],
                    'roles' => ['@'],
                ],
	        ],
        ];

        return $behaviors;
    }

    public function actionIndex() {
        $data = RestUtils::getQuery(\Yii::$app->request->get(), Instructor::find());
        $models = array();

        foreach ($data->each() as $model)
        {
            $temp = $model->toArray();
            $tmpMedia = array();
            foreach ($model->media as $media) {
                $tmpMedia[] = $media->toArray();
            }
            $temp['media'] = $tmpMedia;

            $models[] = $temp;
        }

        return $models;
    }

    public function actionView($id) {
        $staff = Instructor::find()->where([
            'like binary', 'instructorId', $id
        ])->andWhere([
            '=', 'status', User::STATUS_ACTIVE
        ])->one();


        if($staff){
            return $staff->toArray();
        } else {
            throw new NotFoundHttpException("Object not found: $id");
        }
    }

    public function actionCreate() {
        $model = new InstructorModel();
        $model->load(\Yii::$app->getRequest()->getBodyParams(), '');

        if ($model->validate() && $model->save()) {
            $response = \Yii::$app->getResponse();
            $response->setStatusCode(201);
            $id = $model->instructor->instructorId;
            $response->getHeaders()->set('Location', Url::toRoute([$id], true));
        } else {
            // Validation error
            throw new HttpException(422, json_encode($model->errors));
        }

        return $model;

        /*$response = \Yii::$app->getResponse();
        $response->setStatusCode(204);
        return "ok";*/
    }

    public function actionUpdate($id) {
        /*$model = $this->actionView($id);

        $model->load(\Yii::$app->getRequest()->getBodyParams(), '');

        if ($model->validate() && $model->save()) {
            $response = \Yii::$app->getResponse();
            $response->setStatusCode(200);
        } else {
            // Validation error
            throw new HttpException(422, json_encode($model->errors));
        }

        return $model;*/
        $response = \Yii::$app->getResponse();
        $response->setStatusCode(204);
        return "ok";
    }

    public function actionDelete($id) {
        /*$model = $this->actionView($id);

        $model->status = User::STATUS_DELETED;

        if ($model->save(false) === false) {
            throw new ServerErrorHttpException('Failed to delete the object for unknown reason.');
        }*/

        $response = \Yii::$app->getResponse();
        $response->setStatusCode(204);
        return "ok";
    }

    public function actionOptions($id = null) {
        return "ok";
    }
}