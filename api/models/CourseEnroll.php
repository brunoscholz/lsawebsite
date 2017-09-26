<?php

namespace app\models;

use Yii;

/**
 * This is the model class for table "{{%courseenroll}}".
 *
 * @property string $courseEnrollId
 * @property string $courseId
 * @property string $studentId
 * @property integer $created_at
 * @property integer $updated_at
 * @property string $status
 *
 * @property Student $student
 * @property Course $course
 * @property Payments[] $payments
 */
class CourseEnroll extends \yii\db\ActiveRecord
{
    /**
     * @inheritdoc
     */
    public static function tableName()
    {
        return '{{%courseenroll}}';
    }

    /**
     * @inheritdoc
     */
    public function rules()
    {
        return [
            [['courseEnrollId', 'created_at', 'updated_at'], 'required'],
            [['created_at', 'updated_at'], 'integer'],
            [['courseEnrollId', 'courseId', 'studentId'], 'string', 'max' => 21],
            [['status'], 'string', 'max' => 3],
            [['studentId'], 'exist', 'skipOnError' => true, 'targetClass' => Student::className(), 'targetAttribute' => ['studentId' => 'studentId']],
            [['courseId'], 'exist', 'skipOnError' => true, 'targetClass' => Course::className(), 'targetAttribute' => ['courseId' => 'courseId']],
        ];
    }

    /**
     * @inheritdoc
     */
    public function attributeLabels()
    {
        return [
            'courseEnrollId' => Yii::t('app', 'Course Enroll ID'),
            'courseId' => Yii::t('app', 'Course ID'),
            'studentId' => Yii::t('app', 'Student ID'),
            'created_at' => Yii::t('app', 'Created At'),
            'updated_at' => Yii::t('app', 'Updated At'),
            'status' => Yii::t('app', 'Status'),
        ];
    }

    /**
     * @return \yii\db\ActiveQuery
     */
    public function getStudent()
    {
        return $this->hasOne(Student::className(), ['studentId' => 'studentId']);
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
    public function getPayments()
    {
        return $this->hasMany(Payments::className(), ['courseEnrollId' => 'courseEnrollId']);
    }
}
