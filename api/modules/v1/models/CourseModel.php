<?php

namespace app\modules\v1\models;

use Yii;

use app\models\Course;
use app\models\CourseType;
use app\models\School;
use app\models\SchoolCampi;
//use app\models\Instructor;
use app\components\RestUtils;

use yii\base\Model;
use yii\widgets\ActiveForm;

class InstructorModel extends Model
{
	private $_course;

	public function rules()
	{
		return [
			[['Course'], 'required'],
		];
	}

	public function afterValidate()
	{
		$error = false;
		if(!$this->course->validate()) {
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

			$this->course->save();

			// media...

			$tx->commit();
			return true;

		} catch(Exception $e) {
			$tx->rollBack();
			return false;
		}
	}

	public function getCourse()
	{
		return $this->_course;
	}

	public function setCourse($course)
	{
		if($course instanceof Course) {
        	$this->_course = $course;
        } else if (is_array($course)) {
            $this->_course = $this->createCourse($course);
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
		$errorLists['CourseModel'] = $this->errors;
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
			'Course' => $this->course,
		];
	}

	private function createCourse($course)
	{
        $crs = new Course();
        $crs->load($course, '');

        $crs->courseId = RestUtils::generateId();

        $crs->courseTypeId = '';
        $crs->schoolId = '';
        $crs->schoolCampiId = '';

        return $crs;
    }
}