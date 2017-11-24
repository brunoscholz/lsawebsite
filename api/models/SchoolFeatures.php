<?php

namespace app\models;

use Yii;

/**
 * This is the model class for table "{{%schoolfeatures}}".
 *
 * @property string $schoolFeaturesId
 * @property string $schoolId
 * @property string $schoolCampiId
 * @property string $name
 * @property string $value
 * @property string $status
 *
 * @property Schoolcampi $schoolCampi
 * @property School $school
 */
class SchoolFeatures extends \yii\db\ActiveRecord
{
    /**
     * @inheritdoc
     */
    public static function tableName()
    {
        return '{{%schoolfeatures}}';
    }

    /**
     * @inheritdoc
     */
    public function rules()
    {
        return [
            [['schoolFeaturesId', 'name', 'value'], 'required'],
            [['schoolFeaturesId', 'schoolId', 'schoolCampiId'], 'string', 'max' => 21],
            [['name', 'value'], 'string', 'max' => 80],
            [['status'], 'string', 'max' => 3],
            [['schoolCampiId'], 'exist', 'skipOnError' => true, 'targetClass' => Schoolcampi::className(), 'targetAttribute' => ['schoolCampiId' => 'schoolCampiId']],
            [['schoolId'], 'exist', 'skipOnError' => true, 'targetClass' => School::className(), 'targetAttribute' => ['schoolId' => 'schoolId']],
        ];
    }

    /**
     * @inheritdoc
     */
    public function attributeLabels()
    {
        return [
            'schoolFeaturesId' => Yii::t('app', 'School Features ID'),
            'schoolId' => Yii::t('app', 'School ID'),
            'schoolCampiId' => Yii::t('app', 'School Campi ID'),
            'name' => Yii::t('app', 'Name'),
            'value' => Yii::t('app', 'Value'),
            'status' => Yii::t('app', 'Status'),
        ];
    }

    /**
     * @return \yii\db\ActiveQuery
     */
    public function getSchoolCampi()
    {
        return $this->hasOne(SchoolCampi::className(), ['schoolCampiId' => 'schoolCampiId']);
    }

    /**
     * @return \yii\db\ActiveQuery
     */
    public function getSchool()
    {
        return $this->hasOne(School::className(), ['schoolId' => 'schoolId']);
    }
}
