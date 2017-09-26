<?php

namespace app\modules\v1\models;

use Yii;

use app\models\Instructor;
use app\models\User;
use app\components\RestUtils;

use yii\base\Model;
use yii\widgets\ActiveForm;

class InstructorModel extends Model
{
	private $_user;
	private $_instructor;

	public function rules()
	{
		return [
			[['User', 'Instructor'], 'required'],
		];
	}

	public function afterValidate()
	{
		$error = false;
		if(!$this->user->validate()) {
			$error = true;
		}
		if(!$this->instructor->validate()) {
			$error = true;
		}

		if($error)
			$this->addError(null);

		parent::afterValidate();
	}

	public function save()
	{
		if(!$this->validate()) {
			return false;
		}

		try {

			$tx = Yii::$app->db->beginTransaction();

			$this->user->save();
			//$this->buyer->link('buyerId', $this->user);

			$this->instructor->userId = $this->user->userId;
			$this->instructor->save();

			// media...

			$tx->commit();
			return true;

		} catch(Exception $e) {
			$tx->rollBack();
			return false;
		}
	}

	public function getUser()
	{
		return $this->_user;
	}

	public function setUser($user)
	{
		//$this->_user = $user;
		if($user instanceof User) {
        	$this->_user = $user;
        } else if (is_array($user)) {
            $this->_user = $this->createUser($user);
        }
	}

	public function getInstructor()
	{
		return $this->_instructor;
	}

	public function setInstructor($instructor)
	{
		if($instructor instanceof Instructor) {
			$this->_instructor = $instructor;
		} else if (is_array($instructor)) {
			$this->_instructor = $this->createInstructor($instructor);
		}
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
		$errorLists['InstructorModel'] = $this->errors;
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
		return [
			'User' => $this->user,
			'Instructor' => $this->instructor,
		];
	}

	private function createInstructor($instructor)
	{
		$inst = new Instructor();
		$inst->load($instructor, '');

		$inst->instructorId = RestUtils::generateId();
		$inst->about = '...';
		$inst->rating = 0;
		$inst->status = 'ACT';

		return $inst;
	}

	private function createUser($user)
	{
        $usr = new User();
        $usr->load($user, '');

        $usr->userId = RestUtils::generateId();

        return $usr;
    }
}