<?php

namespace app\models;

use Yii;

/**
 * This is the model class for table "{{%coursetype}}".
 *
 * @property string $courseTypeId
 * @property string $name
 * @property integer $certified
 * @property string $status
 *
 * @property Course[] $courses
 */
class CourseType extends \yii\db\ActiveRecord
{
    /**
     * @inheritdoc
     */
    public static function tableName()
    {
        return '{{%coursetype}}';
    }

    /**
     * @inheritdoc
     */
    public function rules()
    {
        return [
            [['courseTypeId', 'name', 'certified'], 'required'],
            [['certified'], 'integer'],
            [['courseTypeId'], 'string', 'max' => 21],
            [['name'], 'string', 'max' => 80],
            [['status'], 'string', 'max' => 3],
        ];
    }

    /**
     * @inheritdoc
     */
    public function attributeLabels()
    {
        return [
            'courseTypeId' => Yii::t('app', 'Course Type ID'),
            'name' => Yii::t('app', 'Name'),
            'certified' => Yii::t('app', 'Certified'),
            'status' => Yii::t('app', 'Status'),
        ];
    }

    /**
     * @return \yii\db\ActiveQuery
     */
    public function getCourses()
    {
        return $this->hasMany(Course::className(), ['courseTypeId' => 'courseTypeId']);
    }
}
