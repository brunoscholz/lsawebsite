<?php
namespace app\modules\v1\controllers;

use Yii;
use app\filters\auth\HttpBearerAuth;

use yii\data\ActiveDataProvider;
use yii\data\ArrayDataProvider;
use yii\filters\AccessControl;
use yii\filters\auth\CompositeAuth;
use yii\helpers\Url;

use yii\web\HttpException;
use yii\web\NotFoundHttpException;
use yii\web\ServerErrorHttpException;

use yii\rest\ActiveController as Controller;
//use app\controllers\RestController as Controller;

use app\models\Search;


class SearchController extends Controller
{
	const PAGE_SIZE = 10;
	public $modelClass = 'app\models\Search';

	public function __construct($id, $module, $config = [])
	{
		parent::__construct($id, $module, $config);
	}

	public function actions()
	{
	    $actions = parent::actions();

	    // customize the data provider preparation with the "prepareDataProvider()" method
	    // $actions['index']['prepareDataProvider'] = [$this, 'prepareDataProvider'];

	    return [
            'index' => [
                'class' => 'yii\rest\IndexAction',
                'modelClass' => $this->modelClass,
                'prepareDataProvider' => [$this, 'prepareDataProvider']
            ],
            'create' => [
            	'class' => 'yii\rest\IndexAction',
                'modelClass' => $this->modelClass,
                'prepareDataProvider' => [$this, 'prepareDataProvider']
            ]/*,
            'options' => [
                'class' => 'yii\rest\OptionsAction'
            ]*/
            /*'featured' => [
                'class' => 'app\modules\v1\actions\NormalAction',
                'modelClass' => $this->modelClass,
                'prepareDataProvider' => [$this, 'prepareFeaturedProvider']
            ],*/
        ];

	    //return $actions;
	}

	public function prepareDataProvider()
	{
		$params = Yii::$app->request->post();
		$q = '';
		if(isset($params['q']) && !empty($params['q'])) {
			$q = $params['q'];
		}

		//$search = Yii::$app->search;
		$searchData = Yii::$app->search->find($q);

		/*var_dump($searchData['results']);
		die();*/
        
        return $searchData['results'];
	}

	public function behaviors()
	{
		$behaviors = parent::behaviors();

		/*$behaviors['authenticator'] = [
			'class' => CompositeAuth::className(),
			'authMethods' => [
				HttpBearerAuth::className(),
			],

		];

		// remove authentication filter
		$auth = $behaviors['authenticator'];
		unset($behaviors['authenticator']);*/

		$behaviors['verbs'] = [
			'class' => \yii\filters\VerbFilter::className(),
			'actions' => [
				'index'  => ['post'],
				'featured'   => ['get'],
			],
		];

		// add CORS filter
		$behaviors['corsFilter'] = [
			'class' => \yii\filters\Cors::className(),
			'cors' => [
				'Origin' => ['*'],
				'Access-Control-Request-Method' => ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
				'Access-Control-Request-Headers' => ['*'],
			],
		];

		// setup access
		/*$behaviors['access'] = [
			'class' => AccessControl::className(),
			'only' => ['index'], //only be applied to
			'rules' => [
				[
					'allow' => true,
					'actions' => ['index'],
					'roles' => ['@'],
				],
				[
					'allow' => true,
					'actions' => ['index'],
					'roles' => ['?'],
				],
			],
		];*/

		return $behaviors;
	}

	/*public function beforeAction($action)
	{            
		if ($action->id == 'index') {
			$this->enableCsrfValidation = false;
		}

		return parent::beforeAction($action);
	}*/

	public function actionIndex() {
		$params = Yii::$app->request->post();
		$q = '';
		if(isset($params['q']) && !empty($params['q'])) {
			$q = $params['q'];
		}

		$search = Yii::$app->search;
		$searchData = $search->find($q);
		//var_dump($searchData);
		//$searchData = $search->find($q, ['model' => 'page']); // Search by index provided only by model `page`.

		return $dataProvider = new ArrayDataProvider([
			'allModels' => $searchData['results'],
			'pagination' => ['pageSize' => self::PAGE_SIZE],
		]);

		/*return $this->render('index', [
			'hits' => $dataProvider->getModels(),
			'pagination' => $dataProvider->getPagination(),
			'query' => $searchData['query']
		]);*/
	}

	public function actionFeatured()
	{
		$models = [];

		// search for most relevant (TBD) cities
		$city = \app\models\Geography::find()
			->where(["countryCode" => "AU"])
			->limit(7)
			->asArray();

		foreach ($city->each() as $ct) {
			$models[] = ['type' => 'City', 'model' => $ct];
		}

		// best reviewes schools
		$school = \app\models\School::find()
			->limit(7)
			->joinWith(['media', 'media.image'])
			->andWhere(['tbl_school.status' => 'ACT'])
			->asArray();

		/*var_dump($school->createCommand()->rawsql);
		die();*/

		foreach ($school->each() as $sc)
		{
			if($sc['media'][0]['image']['thumb'] == '')
				$sc['media'][0]['image']['thumb'] = 'assets/img/generic-avatar.png';
			if($sc['media'][0]['image']['large'] == '')
				$sc['media'][0]['image']['large'] = 'assets/img/generic-cover.jpg';
			//$temp = $sc->toArray();
			/*
			$tmpMedia = array();
			foreach ($sc->media as $media) {
				$tmpMedia[] = $media->toArray();
			}
			$temp['media'] = $tmpMedia;*/

			$models[] = ['type' => 'School', 'model' => $sc];
		}

		// best priced courses
		$course = \app\models\Course::find()
			->limit(7)
			->joinWith(['media', 'media.image'])
			->andWhere(['tbl_course.status' => 'ACT'])
			->asArray();

		foreach ($course->each() as $co)
		{
			if($co['media'][0]['image']['thumb'] == '')
				$co['media'][0]['image']['thumb'] = 'assets/img/generic-avatar.png';
			if($co['media'][0]['image']['large'] == '')
				$co['media'][0]['image']['large'] = 'assets/img/generic-cover.jpg';
			//$temp = $co->toArray();
			/*$tmpMedia = array();
			foreach ($co->media as $media) {
				$tmpMedia[] = $media->toArray();
			}
			$temp['media'] = $tmpMedia;*/

			$models[] = ['type' => 'Course', 'model' => $co];
		}



		// big schools

		return $models;
	}

	public function actionOptions($id = null) {
		return "ok";
	}
}
