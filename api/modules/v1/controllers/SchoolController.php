<?php
namespace app\modules\v1\controllers;

use app\filters\auth\HttpBearerAuth;
use Yii;

use yii\data\ActiveDataProvider;
use yii\filters\AccessControl;
use yii\filters\auth\CompositeAuth;
use yii\helpers\Url;
use yii\rbac\Permission;
use app\controllers\RestController;

use yii\web\HttpException;
use yii\web\NotFoundHttpException;
use yii\web\ServerErrorHttpException;

use app\models\School;

use app\components\RestUtils;


class SchoolController extends RestController
{
	public $modelClass = 'app\models\School';

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
		];
				//'getPermissions'    =>  ['get'],

		// avoid authentication on CORS-pre-flight requests (HTTP OPTIONS method)
		//$behaviors['authenticator']['except'] = ['index', 'view', 'options'];

		// setup access
		$behaviors['access'] = [
			'class' => AccessControl::className(),
			'only' => ['index', 'view', 'create', 'update', 'delete'], //only be applied to
			'rules' => [
				[
					'allow' => true,
					'actions' => ['create', 'update', 'delete'],
					'roles' => ['admin', 'manageStaffs'],
				],
				[
					'actions' => ['index', 'view'],
					'allow' => true,
				],
			],
		];

		return $behaviors;
	}

	/**
	 * Return list of staff members
	 *
	 * @return ActiveDataProvider
	 */
	public function actionIndex() {
		$data = RestUtils::getQuery(\Yii::$app->request->get(), School::find());
        $models = array();

        foreach ($data->each() as $model)
        {
            //$temp = RestUtils::loadQueryIntoVar($model);
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

	/**
	 * Return requested staff member information
	 *
	 * Request: /v1/staff/2
	 *
	 * Sample Response:
	 * {
	 *   "success": true,
	 *   "status": 200,
	 *   "data": {
	 *	        "id": 2,
	 *		    "username": "staff",
	 *		    "email": "staff@staff.com",
	 *		    "unconfirmed_email": "lygagohur@hotmail.com",
	 *		    "role": 50,
	 *		    "role_label": "Staff",
	 *		    "last_login_at": "2017-05-20 18:58:40",
	 *		    "last_login_ip": "127.0.0.1",
	 *		    "confirmed_at": "2017-05-15 09:20:53",
	 *		    "blocked_at": null,
	 *		    "status": 10,
	 *		    "status_label": "Active",
	 *		    "created_at": "2017-05-15 09:19:02",
	 *		    "updated_at": "2017-05-21 23:31:32"
	 *	    }
	 *   }
	 *
	 * @param $id
	 *
	 * @return array|null|\yii\db\ActiveRecord
	 * @throws NotFoundHttpException
	 */
	public function actionView($id) {
		$models = array('success'=>true,'status'=>200);

		$school = School::find()->where([
			'schoolId'    =>  $id
		])->andWhere([
			'status' => 'ACT'
		])->one();
		if($school) {
			//$temp = RestUtils::loadQueryIntoVar($school);
			return $school->toArray();
		} else {
			throw new NotFoundHttpException("Object not found: $id");
		}
	}

	/**
	 * Create new staff member from backend dashboard
	 *
	 * Request: POST /v1/staff/1
	 *
	 * @return User
	 * @throws HttpException
	 */
	public function actionCreate() {
		$model = new School();
		$model->load(\Yii::$app->getRequest()->getBodyParams(), '');

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

	/**
	 * Update staff member information from backend dashboard
	 *
	 * Request: PUT /v1/staff/1
	 *  {
	 *  	"id": 20,
	 *  	"username": "testuser",
	 *  	"email": "test2@test.com",
	 *  	"unconfirmed_email": "test2@test.com",
	 *  	"password": "{password}",
	 *  	"role": 50,
	 *  	"role_label": "Staff",
	 *  	"last_login_at": null,
	 *  	"last_login_ip": null,
	 *  	"confirmed_at": null,
	 *  	"blocked_at": null,
	 *  	"status": 10,
	 *  	"status_label": "Active",
	 *  	"created_at": "2017-05-27 17:30:12",
	 *  	"updated_at": "2017-05-27 17:30:12",
	 *  	"permissions": [
	 *  		{
	 *  			"name": "manageSettings",
	 *  			"description": "Manage settings",
	 *  			"checked": false
	 *  		},
	 *  		{
	 *  			"name": "manageStaffs",
	 *  			"description": "Manage staffs",
	 *  			"checked": false
	 *  		},
	 *  		{
	 *  			"name": "manageUsers",
	 *  			"description": "Manage users",
	 *  			"checked": true
	 *  		}
	 *  	]
	 *  }
	 *
	 *
	 * @param $id
	 *
	 * @return array|null|\yii\db\ActiveRecord
	 * @throws HttpException
	 */
	public function actionUpdate($id) {
		$model = $this->actionView($id);

		$model->load(\Yii::$app->getRequest()->getBodyParams(), '');

		if ($model->validate() && $model->save()) {
			$response = \Yii::$app->getResponse();
			$response->setStatusCode(200);
		} else {
			// Validation error
			throw new HttpException(422, json_encode($model->errors));
		}

		return $model;
	}

	/**
	 * Delete requested staff member from backend dashboard
	 *
	 * Request: DELETE /v1/staff/1
	 *
	 * @param $id
	 *
	 * @return string
	 * @throws ServerErrorHttpException
	 */
	public function actionDelete($id) {
		$model = $this->actionView($id);

		$model->status = School::STATUS_REMOVED;

		if ($model->save(false) === false) {
			throw new ServerErrorHttpException('Failed to delete the object for unknown reason.');
		}

		$response = \Yii::$app->getResponse();
		$response->setStatusCode(204);
		return "ok";
	}

	/**
	 * Return list of available permissions for the staff.  The function will be called when staff form is loaded in backend.
	 *
	 * Request: GET /v1/staff/get-permissions
	 *
	 * Sample Response:
	 * {
	 *		"success": true,
	 *		"status": 200,
	 *		"data": {
	 *			"manageSettings": {
	 *				"name": "manageSettings",
	 *				"description": "Manage settings",
	 *				"checked": false
	 *			},
	 *			"manageStaffs": {
	 *				"name": "manageStaffs",
	 *				"description": "Manage staffs",
	 *				"checked": false
	 *			}
	 *		}
	 *	}
	 */
	public function actionGetPermissions(){
		$authManager = Yii::$app->authManager;

		/** @var Permission[] $permissions */
		$permissions = $authManager->getPermissions();

		/** @var array $tmpPermissions to store list of available permissions */
		$tmpPermissions = [];

		/**
		 * @var string $permissionKey
		 * @var Permission $permission
		 */
		foreach($permissions as $permissionKey => $permission) {
			$tmpPermissions[] = [
				'name'          =>  $permission->name,
				'description'   =>  $permission->description,
				'checked'       =>  false,
			];
		}

		return $tmpPermissions;
	}

	public function actionOptions($id = null) {
		return "ok";
	}
}