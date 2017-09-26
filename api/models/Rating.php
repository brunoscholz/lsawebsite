<?php

namespace app\models;

use Yii;

/**
 * This is the model class for table "{{%rating}}".
 *
 * @property string $ratingId
 * @property string $studentId
 * @property string $schoolId
 * @property string $courseId
 * @property string $instructorId
 * @property integer $created_at
 * @property integer $updated_at
 * @property string $status
 *
 * @property Instructor $instructor
 * @property Course $course
 * @property School $school
 * @property Student $student
 */
class Rating extends \yii\db\ActiveRecord
{
    /**
     * @inheritdoc
     */
    public static function tableName()
    {
        return '{{%rating}}';
    }

    /**
     * @inheritdoc
     */
    public function rules()
    {
        return [
            [['ratingId', 'created_at', 'updated_at'], 'required'],
            [['created_at', 'updated_at'], 'integer'],
            [['ratingId', 'studentId', 'schoolId', 'courseId', 'instructorId'], 'string', 'max' => 21],
            [['status'], 'string', 'max' => 3],
            [['instructorId'], 'exist', 'skipOnError' => true, 'targetClass' => Instructor::className(), 'targetAttribute' => ['instructorId' => 'instructorId']],
            [['courseId'], 'exist', 'skipOnError' => true, 'targetClass' => Course::className(), 'targetAttribute' => ['courseId' => 'courseId']],
            [['schoolId'], 'exist', 'skipOnError' => true, 'targetClass' => School::className(), 'targetAttribute' => ['schoolId' => 'schoolId']],
            [['studentId'], 'exist', 'skipOnError' => true, 'targetClass' => Student::className(), 'targetAttribute' => ['studentId' => 'studentId']],
        ];
    }

    /**
     * @inheritdoc
     */
    public function attributeLabels()
    {
        return [
            'ratingId' => Yii::t('app', 'Rating ID'),
            'studentId' => Yii::t('app', 'Student ID'),
            'schoolId' => Yii::t('app', 'School ID'),
            'courseId' => Yii::t('app', 'Course ID'),
            'instructorId' => Yii::t('app', 'Instructor ID'),
            'created_at' => Yii::t('app', 'Created At'),
            'updated_at' => Yii::t('app', 'Updated At'),
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
    public function getStudent()
    {
        return $this->hasOne(Student::className(), ['studentId' => 'studentId']);
    }
}
