<?php

namespace app\models;

use Yii;

/**
 * This is the model class for table "{{%relationship}}".
 *
 * @property string $relationshipId
 * @property string $actionReferenceId
 * @property string $referenceId
 * @property string $courseId
 * @property string $studentId
 * @property string $schoolId
 * @property string $locationId
 * @property string $transactionId
 * @property integer $date
 *
 * @property Referencetransaction[] $referencetransactions
 * @property Transaction $transaction
 * @property Course $course
 * @property Location $location
 * @property Referencetransaction $reference
 * @property School $school
 * @property Student $student
 */
class Relationship extends \yii\db\ActiveRecord
{
    /**
     * @inheritdoc
     */
    public static function tableName()
    {
        return '{{%relationship}}';
    }

    /**
     * @inheritdoc
     */
    public function rules()
    {
        return [
            [['relationshipId', 'date'], 'required'],
            [['date'], 'integer'],
            [['relationshipId', 'actionReferenceId', 'referenceId', 'courseId', 'studentId', 'schoolId', 'locationId', 'transactionId'], 'string', 'max' => 21],
            [['transactionId'], 'exist', 'skipOnError' => true, 'targetClass' => Transaction::className(), 'targetAttribute' => ['transactionId' => 'transactionId']],
            [['courseId'], 'exist', 'skipOnError' => true, 'targetClass' => Course::className(), 'targetAttribute' => ['courseId' => 'courseId']],
            [['locationId'], 'exist', 'skipOnError' => true, 'targetClass' => Location::className(), 'targetAttribute' => ['locationId' => 'locationId']],
            [['referenceId'], 'exist', 'skipOnError' => true, 'targetClass' => Referencetransaction::className(), 'targetAttribute' => ['referenceId' => 'referenceTransactionId']],
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
            'relationshipId' => Yii::t('app', 'Relationship ID'),
            'actionReferenceId' => Yii::t('app', 'Action Reference ID'),
            'referenceId' => Yii::t('app', 'Reference ID'),
            'courseId' => Yii::t('app', 'Course ID'),
            'studentId' => Yii::t('app', 'Student ID'),
            'schoolId' => Yii::t('app', 'School ID'),
            'locationId' => Yii::t('app', 'Location ID'),
            'transactionId' => Yii::t('app', 'Transaction ID'),
            'date' => Yii::t('app', 'Date'),
        ];
    }

    /**
     * @return \yii\db\ActiveQuery
     */
    public function getReferenceTransactions()
    {
        return $this->hasMany(ReferenceTransaction::className(), ['relationshipId' => 'relationshipId']);
    }

    /**
     * @return \yii\db\ActiveQuery
     */
    public function getTransaction()
    {
        return $this->hasOne(Transaction::className(), ['transactionId' => 'transactionId']);
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
    public function getLocation()
    {
        return $this->hasOne(Location::className(), ['locationId' => 'locationId']);
    }

    /**
     * @return \yii\db\ActiveQuery
     */
    public function getReference()
    {
        return $this->hasOne(ReferenceTransaction::className(), ['referenceTransactionId' => 'referenceId']);
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
