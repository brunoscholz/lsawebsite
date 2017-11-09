<?php

namespace app\models;

use Yii;
//use app\components\behaviors\SearchBehavior;

use yii\base\Model;
use yii\widgets\ActiveForm;

/**
 * This is the model class for Search object.
 *
 * @property string $q
 * all others
 */
class Search extends Model
{
	private $_term;

	public function getPrimaryKey()
	{
		return 'key';
	}

	/**
	 * @inheritdoc
	 */
	public function rules()
	{
		return [
			[['q'], 'required'],
			[['q'], 'string'],
			//[['cost', 'discount'], 'number'],
			[['q'], 'string', 'max' => 21],
		];
	}

	public function afterValidate()
	{
		$error = false;
		/*if(!$this->course->validate()) {
			$error = true;
		}*/

		if($error)
			$this->addError(null);

		parent::afterValidate();
	}

	public function save()
	{
		return true;
		if(!$this->validate()) {
			return false;
		}

		try {

			$tx = Yii::$app->db->beginTransaction();

			//$this->course->save();
			// media...

			$tx->commit();
			return true;

		} catch(Exception $e) {
			$tx->rollBack();
			return false;
		}
	}

	public function getQ()
	{
		return $this->_term;
	}

	public function setQ($term)
	{
		$this->_term = $term;
	}

	public function fields()
	{
		$fields = parent::fields();
		$fields[] = 'q';
		return $fields;
	}

	/**
	 * @inheritdoc
	 */
	public function attributeLabels()
	{
		return [
			'q' => Yii::t('app', 'Search Term'),
		];
	}

	public function errorSummary($form)
	{
		$errorLists = [];
		foreach ($this->getAllModels() as $id => $model) {
			$errorList = $form->errorSummary($model, [
				'header' => '<p>The following fields have errors: <b>'.$id.'</b></p>',
			]);
			$errorList = str_replace('<li></li>', '', $errorList); // remove the empty error
			$errorLists[] = $errorList;
		}
		return implode('', $errorLists);
	}

	public function errorList()
	{
		$errorLists = [];
		foreach ($this->getAllModels() as $id => $model) {
			if($model)
				$errorLists[$id] = $model->errors;
		}
		$errorLists['Search'] = $this->errors;
		return $errorLists;
	}

	public function firstError()
	{
		$ret = RestUtils::arrayCleaner($this->errorList());

		while(is_array($ret))
			$ret = reset($ret);

		return $ret;
	}

	private function getAllModels()
	{
		return [];
	}
}
