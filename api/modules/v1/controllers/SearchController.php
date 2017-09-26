<?php
namespace app\modules\v1\controllers;

use Yii;

use yii\filters\AccessControl;
use yii\filters\auth\CompositeAuth;
use app\filters\auth\HttpBearerAuth;
use yii\rest\Controller;
use yii\data\ArrayDataProvider;

use app\models\Search;


class SearchController extends Controller
{
	const PAGE_SIZE = 10;

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


		$behaviors['authenticator'] = [
			'class' => CompositeAuth::className(),
			'authMethods' => [
				HttpBearerAuth::className(),
			],

		];

		$behaviors['verbs'] = [
			'class' => \yii\filters\VerbFilter::className(),
			'actions' => [
				'index'  => ['get'],
                'search'   => ['get'],
			],
		];

		// remove authentication filter
		$auth = $behaviors['authenticator'];
		unset($behaviors['authenticator']);

		// add CORS filter
		$behaviors['corsFilter'] = [
			'class' => \yii\filters\Cors::className(),
			'cors' => [
				'Origin' => ['*'],
				'Access-Control-Request-Method' => ['GET', 'POST'],
				'Access-Control-Request-Headers' => ['*'],
			],
		];

		// re-add authentication filter
		$behaviors['authenticator'] = $auth;
		// avoid authentication on CORS-pre-flight requests (HTTP OPTIONS method)
		$behaviors['authenticator']['except'] = ['options', 'index', 'search'];

		// setup access
		$behaviors['access'] = [
			'class' => AccessControl::className(),
			'only' => ['index', 'search'], //only be applied to
			'rules' => [
				[
					'allow' => true,
					'actions' => ['index', 'search'],
					'roles' => ['?'],
				],
			],
		];

		/*$behaviors['contentNegotiator'] = [
			'class' => \yii\filters\ContentNegotiator::className(),
			'only' => ['sse'],
			'formatParam' => '_format',
			'formats' => [
				'text/event-stream' => \yii\web\Response::FORMAT_RAW,
			],
		];*/

		return $behaviors;
	}

	public function actionIndexOld() {
		$params = Yii::$app->request->post();
        $q = '';
        if(isset($params['Search']['term']) && !empty($params['Search']['term'])) {
            $q = $params['Search']['term'];
        }

        $search = Yii::$app->search;
        $searchData = $search->find($q);
        //var_dump($searchData);
        //$searchData = $search->find($q, ['model' => 'page']); // Search by index provided only by model `page`.

        $dataProvider = new ArrayDataProvider([
            'allModels' => $searchData['results'],
            'pagination' => ['pageSize' => self::PAGE_SIZE],
        ]);

        return $this->render('index', [
            'hits' => $dataProvider->getModels(),
            'pagination' => $dataProvider->getPagination(),
            'query' => $searchData['query']
        ]);
	}

	public function actionIndex($q = null) {
		$search = Yii::$app->search;
        $searchData = $search->find($q);

        $dataProvider = new ArrayDataProvider([
            'allModels' => $searchData['results'],
            'pagination' => ['pageSize' => self::PAGE_SIZE],
        ]);

        return [
            'hits' => $dataProvider->getModels(),
            'pagination' => $dataProvider->getPagination(),
            'query' => $searchData['query']
        ];
	}

	public function actionOptions($id = null) {
		return "ok";
	}
}
