<?php

namespace app\models;

use Yii;

/**
 * This is the model class for table "{{%schoolawards}}".
 *
 * @property string $schoolAwardsId
 * @property string $schoolId
 * @property string $name
 * @property string $date
 * @property string $status
 *
 * @property School $school
 */
class SchoolAwards extends \yii\db\ActiveRecord
{
    /**
     * @inheritdoc
     */
    public static function tableName()
    {
        return '{{%schoolawards}}';
    }

    /**
     * @inheritdoc
     */
    public function rules()
    {
        return [
            [['schoolAwardsId', 'name', 'date'], 'required'],
            [['date'], 'safe'],
            [['schoolAwardsId', 'schoolId'], 'string', 'max' => 21],
            [['name'], 'string', 'max' => 80],
            [['status'], 'string', 'max' => 3],
            [['schoolId'], 'exist', 'skipOnError' => true, 'targetClass' => School::className(), 'targetAttribute' => ['schoolId' => 'schoolId']],
        ];
    }

    /**
     * @inheritdoc
     */
    public function attributeLabels()
    {
        return [
            'schoolAwardsId' => Yii::t('app', 'School Awards ID'),
            'schoolId' => Yii::t('app', 'School ID'),
            'name' => Yii::t('app', 'Name'),
            'date' => Yii::t('app', 'Date'),
            'status' => Yii::t('app', 'Status'),
        ];
    }

    /**
     * @return \yii\db\ActiveQuery
     */
    public function getSchool()
    {
        return $this->hasOne(School::className(), ['schoolId' => 'schoolId']);
    }
}
