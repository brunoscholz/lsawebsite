<?php

namespace app\components;

use Yii;
use yii\base\Component;
use yii\base\InvalidConfigException;
use app\components\behaviors\SearchBehavior;


/**
 *
 * @author Bruno Scholz
 */
class Search extends Component
{
    /** @var array */
    public $models = [];

    /** @var int Minimum term prefix length (number of minimum non-wildcard characters) */
    public $minPrefixLength = 3;

    /** @var int 0 means no limit */
    public $resultsLimit = 0;

    public function __destruct()
    {
        
    }

    public function init()
    {
        /*QueryParser::setDefaultEncoding('UTF-8');
        if ($this->caseSensitivity) {
            Analyzer::setDefault($this->parseNumeric ? new Utf8Num() : new Utf8());
        } else {
            Analyzer::setDefault($this->parseNumeric ? new CaseInsensitiveNum() : new CaseInsensitive());
        }

        $this->indexDirectory = FileHelper::normalizePath(Yii::getAlias($this->indexDirectory));
        $this->luceneIndex = $this->getLuceneIndex($this->indexDirectory);*/
        /*

        foreach ($this->models as $modelName) {

            $model = new $modelName;
            if ($model->hasMethod('getSearchModels')) {
                foreach ($model->getSearchModels()->all() as $pageModel) {
                    $this->luceneIndex->addDocument($this->createDocument(
                        call_user_func($model->searchFields, $pageModel)
                    ));
                }
            } else {
                throw new InvalidConfigException(
                    "Not found right `SearchBehavior` behavior in `{$modelName}`."
                );
            }
        }
        */

    }

    /**
     * Search page for the term in the index.
     * @param string $term
     * @param array $fields (string => string)
     * @return array ('results' => \ZendSearch\Lucene\Search\QueryHit[], 'query' => string)
     */
    public function find($term, $fields = [])
    {
        $term = strtolower($term);
        $res = [];

        /** @var \yii\db\ActiveRecord $modelName */
        foreach ($this->models as $modelName) {
            /** @var behaviors\SearchBehavior $model */
            /** @var array $page */
            $model = new $modelName;

            $tableName = $model->tableSchema->name;
            if ($model->hasMethod('getSearchModels')) {
                foreach ($model->getSearchModels($term)->all() as $pageModel) {
                    array_push($res, call_user_func($model->searchFields, $pageModel));
                    //$res[] = call_user_func($model->searchFields, $pageModel);
                }
            } else {
                throw new InvalidConfigException(
                    "Not found right `SearchBehavior` behavior in `{$modelName}`."
                );
            }
        }

        /*var_dump($res);
        die();*/

        return [
            'results' => $res,
            'query' => $term
        ];
    }

    /**
     * @param array $fields ('name' => string, 'value' => string, ['type' => string])
     * Default type is 'text'.
     * @return Document
     */
    protected function createQuery($fields)
    {
        /*$term = strtolower($term);
        $res = [];

        foreach ($this->models as $modelName) {

            $model = new $modelName;

            $tableName = $model->tableSchema->name;
            if ($model->hasMethod('getSearchModels')) {
                $query = $model->getSearchModels($term);

                $shortName = str_replace("common\\models\\", "", $modelName);
                $res[$shortName] = $query;
            } else {
                throw new InvalidConfigException(
                    "Not found right `SearchBehavior` behavior in `{$modelName}`."
                );
            }
        }

        return [
            'results' => $res,
            'query' => $term
        ];*/
    }


}