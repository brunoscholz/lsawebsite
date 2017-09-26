<?php

namespace app\models;

use Yii;

/**
 * This is the model class for table "{{%schoolcampi}}".
 *
 * @property string $schoolCampiId
 * @property string $schoolId
 * @property string $locationId
 * @property string $name
 * @property string $status
 *
 * @property Course[] $courses
 * @property Location $location
 * @property School $school
 * @property Schoolfeatures[] $schoolfeatures
 */
class SchoolCampi extends \yii\db\ActiveRecord
{
    /**
     * @inheritdoc
     */
    public static function tableName()
    {
        return '{{%schoolcampi}}';
    }

    /**
     * @inheritdoc
     */
    public function rules()
    {
        return [
            [['schoolCampiId', 'name'], 'required'],
            [['schoolCampiId', 'schoolId', 'locationId'], 'string', 'max' => 21],
            [['name'], 'string', 'max' => 120],
            [['status'], 'string', 'max' => 3],
            [['locationId'], 'exist', 'skipOnError' => true, 'targetClass' => Location::className(), 'targetAttribute' => ['locationId' => 'locationId']],
            [['schoolId'], 'exist', 'skipOnError' => true, 'targetClass' => School::className(), 'targetAttribute' => ['schoolId' => 'schoolId']],
        ];
    }

    /**
     * @inheritdoc
     */
    public function attributeLabels()
    {
        return [
            'schoolCampiId' => Yii::t('app', 'School Campi ID'),
            'schoolId' => Yii::t('app', 'School ID'),
            'locationId' => Yii::t('app', 'Location ID'),
            'name' => Yii::t('app', 'Name'),
            'status' => Yii::t('app', 'Status'),
        ];
    }

    /**
     * @return \yii\db\ActiveQuery
     */
    public function getCourses()
    {
        return $this->hasMany(Course::className(), ['schoolCampiId' => 'schoolCampiId']);
    }

    /**
     * @return \yii\db\ActiveQuery
     */
    public function getLocation()
    {
        return $this->hasOne(Location::className(), ['locationId' => 'locationId']);
    }

    /**
     * @return \yii\db\ActiveQuery
     */
    public function getSchool()
    {
        return $this->hasOne(School::className(), ['schoolId' => 'schoolId']);
    }

    /**
     * @return \yii\db\ActiveQuery
     */
    public function getSchoolfeatures()
    {
        return $this->hasMany(Schoolfeatures::className(), ['schoolCampiId' => 'schoolCampiId']);
    }
}
