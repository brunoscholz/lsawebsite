<?php

namespace app\models;

use Yii;

/**
 * This is the model class for table "{{%payments}}".
 *
 * @property string $paymentId
 * @property string $studentId
 * @property string $courseEnrollId
 * @property double $cost
 * @property double $discount
 * @property integer $created_at
 * @property integer $updated_at
 * @property integer $dueDate
 * @property string $status
 *
 * @property Courseenroll $courseEnroll
 * @property Student $student
 */
class Payments extends \yii\db\ActiveRecord
{
    /**
     * @inheritdoc
     */
    public static function tableName()
    {
        return '{{%payments}}';
    }

    /**
     * @inheritdoc
     */
    public function rules()
    {
        return [
            [['paymentId', 'cost', 'created_at', 'updated_at', 'dueDate'], 'required'],
            [['cost', 'discount'], 'number'],
            [['created_at', 'updated_at', 'dueDate'], 'integer'],
            [['paymentId', 'studentId', 'courseEnrollId'], 'string', 'max' => 21],
            [['status'], 'string', 'max' => 3],
            [['courseEnrollId'], 'exist', 'skipOnError' => true, 'targetClass' => Courseenroll::className(), 'targetAttribute' => ['courseEnrollId' => 'courseEnrollId']],
            [['studentId'], 'exist', 'skipOnError' => true, 'targetClass' => Student::className(), 'targetAttribute' => ['studentId' => 'studentId']],
        ];
    }

    /**
     * @inheritdoc
     */
    public function attributeLabels()
    {
        return [
            'paymentId' => Yii::t('app', 'Payment ID'),
            'studentId' => Yii::t('app', 'Student ID'),
            'courseEnrollId' => Yii::t('app', 'Course Enroll ID'),
            'cost' => Yii::t('app', 'Cost'),
            'discount' => Yii::t('app', 'Discount'),
            'created_at' => Yii::t('app', 'Created At'),
            'updated_at' => Yii::t('app', 'Updated At'),
            'dueDate' => Yii::t('app', 'Due Date'),
            'status' => Yii::t('app', 'Status'),
        ];
    }

    /**
     * @return \yii\db\ActiveQuery
     */
    public function getCourseEnroll()
    {
        return $this->hasOne(Courseenroll::className(), ['courseEnrollId' => 'courseEnrollId']);
    }

    /**
     * @return \yii\db\ActiveQuery
     */
    public function getStudent()
    {
        return $this->hasOne(Student::className(), ['studentId' => 'studentId']);
    }
}
