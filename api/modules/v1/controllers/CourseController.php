<?php
namespace app\modules\v1\controllers;

use app\filters\auth\HttpBearerAuth;
use Yii;

use yii\data\ActiveDataProvider;
use yii\filters\AccessControl;
use yii\filters\auth\CompositeAuth;
use yii\helpers\Url;
use yii\rbac\Permission;

use yii\helpers\ArrayHelper;

//use yii\rest\ActiveController as Controller;
use app\controllers\RestController as Controller;

use yii\web\HttpException;
use yii\web\NotFoundHttpException;
use yii\web\ServerErrorHttpException;

use app\models\Course;
use app\models\CourseEnroll;
use app\modules\v1\models\CourseModel;
use app\components\RestUtils;


class CourseController extends Controller
{
	public $modelClass = 'app\models\Course';

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
				'enroll' => ['post'],
			],
		];
				//'getPermissions'    =>  ['get'],

		// avoid authentication on CORS-pre-flight requests (HTTP OPTIONS method)
		//$behaviors['authenticator']['except'] = ['options'];

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

		$behaviors['authenticator']['except'][] = 'view';
		$behaviors['authenticator']['except'][] = 'index';

		return $behaviors;
	}

	/**
	 * Return list of staff members
	 *
	 * @return ActiveDataProvider
	 */
	public function actionIndex() {
		$q = \Yii::$app->request->get();
		$m = Course::find();
		$data = RestUtils::getQuery($q, $m);

		$models = array();

		//return $data->createCommand()->rawsql;

		//$data->andFilterWhere(['like binary', 'tbl_user.userId', $filter['userId']]);
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

		//echo RestUtils::sendResult($models['status'], $models);
		return $models;
	
		/*return new ActiveDataProvider([
			'query' =>  Course::find()->where(['status' => 'ACT'])
		]);*/
	}

	/**
	 * Return requested staff member information
	 *
	 * @param $id
	 *
	 * @return array|null|\yii\db\ActiveRecord
	 * @throws NotFoundHttpException
	 */
	public function actionView($id) {

		$course = Course::find()->where([
			'courseId'    =>  $id
		])->andWhere([
			'status' => 'ACT'
		])->one();

		if($course) {
			//$temp = $course->toArray();
			$temp = ArrayHelper::toArray($course, [], false);

			$tmpMedia = array();
			foreach ($course->media as $media) {
				if($media)
					$tmpMedia[] = $media->toArray();
			}
			$temp['media'] = $tmpMedia;

			//return $temp;

			if($course->school)
				$temp['school'] = $course->school->toArrayCourse();
				//$temp['school'] = ArrayHelper::toArray($course->school, [], false);
				//$temp['school'] = $course->school->toArray();

/*			if($course->courseType)
				$temp['courseType'] = $course->courseType->toArray();*/

			/*if($course->schoolCampi)
				$temp['schoolCampi'] = $course->schoolCampi->toArray();*/

			//$models[] = $temp;

			return $temp;
		} else {
			throw new NotFoundHttpException("Object not found: $id");
		}
	}

	public function actionEnroll() {
		$params = \Yii::$app->getRequest()->getBodyParams();

		$usr = $stu = null;
		if(isset($params['courseId']) && !empty($params['courseId']))
			$usr = $params['courseId'];

		if(isset($params['studentId']) && !empty($params['studentId']))
			$stu = $params['studentId'];

		if(is_null($usr) || is_null($stu)) {
			throw new HttpException(422, json_encode('Invalid Parameters'));
		}

		$model = new CourseEnroll();
		$model->courseEnrollId = RestUtils::generateId();
		$model->courseId = $usr;
		$model->studentId = $stu;
		$model->status = 'PEN';

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
	 * Create new staff member from backend dashboard
	 *
	 * Request: POST /v1/staff/1
	 *
	 * @return User
	 * @throws HttpException
	 */
	public function actionCreate() {
		/*$model = new CourseModel();
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

		return $model;*/
	}

	/**
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

		$model->status = Course::STATUS_REMOVED;

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

	function array_filter_recursive($input) 
	{ 
		foreach ($input as &$value) 
		{ 
			if (is_array($value)) 
			{ 
				$value = array_filter_recursive($value); 
			} 
		} 

		return array_filter($input); 
	}
}