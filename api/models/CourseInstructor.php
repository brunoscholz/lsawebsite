<?php

namespace app\models;

use Yii;

/**
 * This is the model class for table "{{%courseinstructor}}".
 *
 * @property string $courseInstructorId
 * @property string $courseId
 * @property string $instructorId
 * @property string $status
 *
 * @property Instructor $instructor
 * @property Course $course
 */
class CourseInstructor extends \yii\db\ActiveRecord
{
    /**
     * @inheritdoc
     */
    public static function tableName()
    {
        return '{{%courseinstructor}}';
    }

    /**
     * @inheritdoc
     */
    public function rules()
    {
        return [
            [['courseInstructorId'], 'required'],
            [['courseInstructorId', 'courseId', 'instructorId'], 'string', 'max' => 21],
            [['status'], 'string', 'max' => 3],
            [['instructorId'], 'exist', 'skipOnError' => true, 'targetClass' => Instructor::className(), 'targetAttribute' => ['instructorId' => 'instructorId']],
            [['courseId'], 'exist', 'skipOnError' => true, 'targetClass' => Course::className(), 'targetAttribute' => ['courseId' => 'courseId']],
        ];
    }

    /**
     * @inheritdoc
     */
    public function attributeLabels()
    {
        return [
            'courseInstructorId' => Yii::t('app', 'Course Instructor ID'),
            'courseId' => Yii::t('app', 'Course ID'),
            'instructorId' => Yii::t('app', 'Instructor ID'),
            'status' => Yii::t('app', 'Status'),
        ];
    }

    /**
     * @return \yii\db\ActiveQuery
     */
    public function getInstructor()
    {
        return $this->hasOne(Instructor::className(), ['instructorId' => 'instructorId']);
    }

    /**
     * @return \yii\db\ActiveQuery
     */
    public function getCourse()
    {
        return $this->hasOne(Course::className(), ['courseId' => 'courseId']);
    }
}
