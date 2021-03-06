<?php
namespace app\modules\v1\controllers;

use Yii;
use app\filters\auth\HttpBearerAuth;
use app\models\UserEditForm;

use yii\data\ActiveDataProvider;
use yii\filters\AccessControl;
use yii\filters\auth\CompositeAuth;
use yii\helpers\Url;

use yii\web\HttpException;
use yii\web\NotFoundHttpException;
use yii\web\ServerErrorHttpException;

//use yii\rest\ActiveController;
use app\controllers\RestController;

use app\models\Student;
use app\modules\v1\models\StudentModel;
use app\models\User;
use app\components\RestUtils;

class StudentController extends RestController
{
    public $modelClass = 'app\models\Student';

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
        $q = \Yii::$app->request->get();
        $m = Student::find();
        $data = RestUtils::getQuery($q, $m);

        $models = array();

        //$data->andFilterWhere(['like binary', 'tbl_user.userId', $filter['userId']]);
        foreach ($data->each() as $model)
        {
            $tmpEnroll = array();
            foreach ($model->courseEnrolls as $ce) {

                $tmpEnroll[] = $ce->toArray();
            }
            $temp['courseEnrolls'] = $tmpEnroll;

            $models[] = $temp;
        }

        //echo RestUtils::sendResult($models['status'], $models);
        return $models;
    }

    public function actionView($id) {
        $staff = Student::find()->where([
            'like binary', 'studentId', $id
        ])->andWhere([
            '=', 'status', User::STATUS_ACTIVE
        ])->one();


        if($staff) {
            $temp = $staff->toArray();

            $tmpEnroll = array();
            foreach ($staff->courseEnrolls as $ce) {

                $tmpEnroll[] = $ce->toArray();
            }
            $temp['courseEnrolls'] = $tmpEnroll;

            return $temp;
        } else {
            throw new NotFoundHttpException("Object not found: $id");
        }
    }

    public function actionCreate() {
        $model = new StudentModel();
        $model->load(\Yii::$app->getRequest()->getBodyParams(), '');

        if ($model->validate() && $model->save()) {
            $response = \Yii::$app->getResponse();
            $response->setStatusCode(201);
            $id = $model->student->studentId;
            $response->getHeaders()->set('Location', Url::toRoute([$id], true));
        } else {
            // Validation error
            throw new HttpException(422, json_encode($model->errorList()));
        }

        return $model;
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