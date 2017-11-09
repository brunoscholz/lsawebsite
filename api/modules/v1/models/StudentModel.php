<?php

namespace app\modules\v1\models;

use Yii;

use app\models\Student;
use app\models\User;
use app\models\Location;
use app\models\Geography;
use app\components\RestUtils;

use yii\base\Model;
use yii\widgets\ActiveForm;

class StudentModel extends Model
{
	private $_user;
	private $_student;
	private $_location;
	private $_geography;
	private $_media;
	private $_image;

	public function rules()
	{
		return [
			[['User', 'Student', 'Location', 'Geography'], 'required'],
		];
	}

	public function afterValidate()
	{
		$error = false;
		if(!$this->user->validate()) {
			$error = true;
		}
		if(!$this->geography->validate()) {
			$error = true;
		}
		if(!$this->location->validate()) {
			$error = true;
		}
		if(!$this->student->validate()) {
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
			$this->geography->save();

			$this->location->geographyId = $this->geography->geographyId;
			$this->location->save();

			$this->student->userId = $this->user->userId;
			$this->student->locationId = $this->location->locationId;
			$this->student->save();

			// media...
			/*if ($this->image->upload()) {
                $this->image->imageLarge = null;
                $this->image->imageThumb = null;
            	$this->image->save();
            }

            $this->media->imageId = $this->image->imageId;
            $this->media->save();*/

			$tx->commit();
			return true;

		} catch(Exception $e) {
			$tx->rollBack();
			return false;
		}
	}

	public function load($data, $formName = null)
    {
        parent::load($data, $formName);

        $set = $data['Geography'];
        $geo = Geography::find()->where([
            'like', 'countryCode', $set['countryCode']
        ])->andWhere([
            'LIKE', 'LOWER(cityName)', '%'.strtolower($set['cityName']).'%'
        ])->one();

        //var_dump($geo->createCommand()->rawsql);

        if ($geo) {
        	$this->geography = $geo;
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

	public function getStudent()
	{
		return $this->_student;
	}

	public function setStudent($student)
	{
		if($student instanceof Student) {
			$this->_student = $student;
		} else if (is_array($student)) {
			$this->_student = $this->createStudent($student);
		}
	}

	public function getLocation()
	{
		return $this->_location;
	}

	public function setLocation($location)
	{
		if($location instanceof Location) {
			$this->_location = $location;
		} else if (is_array($location)) {
			$this->_location = $this->createLocation($location);
		}
	}

	public function getGeography()
	{
		return $this->_geography;
	}

	public function setGeography($geo)
	{
		if($geo instanceof Geography) {
			$this->_geography = $geo;
		} else if (is_array($geo)) {
			$this->_geography = $this->createGeography($geo);
		}
	}

	public function getMedia()
	{
		return $this->_media;
	}

	public function setMedia($med)
	{
		if($med instanceof Media) {
			$this->_media = $med;
		} else if (is_array($med)) {
			$this->_media = $this->createMedia($med);
		}
	}

	public function getImage()
	{
		return $this->_image;
	}

	public function setImage($img)
	{
		if($img instanceof Image) {
			$this->_image = $img;
		} else if (is_array($img)) {
			$this->_image = $this->createImage($img);
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
			if($model && !empty($model->errors))
				$errorLists[$id] = $model->errors;
		}

		if(!empty($this->errors))
			$errorLists['StudentModel'] = $this->errors;

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
			'Student' => $this->student,
			'Location' => $this->location,
			'Geography' => $this->geography,
		];
	}

	private function createStudent($student)
	{
		$stu = new Student();
		$stu->load($student, '');

		$stu->studentId = RestUtils::generateId();

		return $stu;
	}

	private function createUser($user)
	{
        $usr = new User();
        $usr->load($user, '');

        $usr->userId = RestUtils::generateId();

        return $usr;
    }

    private function createLocation($location)
    {
    	$loc = new Location();
        $loc->load($location, '');

        $loc->locationId = RestUtils::generateId();

        return $loc;
    }

    private function createGeography($geog)
    {
    	$geo = new Geography();
        $geo->load($geog, '');

        $geo->geographyId = RestUtils::generateId();

        return $geo;
    }

    private function createMedia($media)
    {
    	$med = new Media();
    	//$med->load($media, '');
        $med->mediaId = RestUtils::generateId();

        return $med;
    }

    private function createImage($image)
    {
    	$img = new Image();
    	//$img->load($image, '');
        $img->imageId = RestUtils::generateId();

        return $img;
    }
}