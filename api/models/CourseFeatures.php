<?php

namespace app\models;

use Yii;

/**
 * This is the model class for table "{{%coursefeatures}}".
 *
 * @property string $courseFeaturesId
 * @property string $courseId
 * @property string $name
 * @property string $value
 * @property string $status
 *
 * @property Course $course
 */
class CourseFeatures extends \yii\db\ActiveRecord
{
    /**
     * @inheritdoc
     */
    public static function tableName()
    {
        return '{{%coursefeatures}}';
    }

    /**
     * @inheritdoc
     */
    public function rules()
    {
        return [
            [['courseFeaturesId', 'name', 'value'], 'required'],
            [['courseFeaturesId', 'courseId'], 'string', 'max' => 21],
            [['name', 'value'], 'string', 'max' => 80],
            [['status'], 'string', 'max' => 3],
            [['courseId'], 'exist', 'skipOnError' => true, 'targetClass' => Course::className(), 'targetAttribute' => ['courseId' => 'courseId']],
        ];
    }

    /**
     * @inheritdoc
     */
    public function attributeLabels()
    {
        return [
            'courseFeaturesId' => Yii::t('app', 'Course Features ID'),
            'courseId' => Yii::t('app', 'Course ID'),
            'name' => Yii::t('app', 'Name'),
            'value' => Yii::t('app', 'Value'),
            'status' => Yii::t('app', 'Status'),
        ];
    }

    /**
     * @return \yii\db\ActiveQuery
     */
    public function getCourse()
    {
        return $this->hasOne(Course::className(), ['courseId' => 'courseId']);
    }
}
