<?php

namespace app\models;

use Yii;

/**
 * This is the model class for table "{{%coursesectionitem}}".
 *
 * @property string $courseSectionItemId
 * @property string $courseSectionId
 * @property string $name
 * @property integer $created_at
 * @property integer $updated_at
 * @property string $status
 *
 * @property Coursesection $courseSection
 */
class CourseSectionItem extends \yii\db\ActiveRecord
{
    /**
     * @inheritdoc
     */
    public static function tableName()
    {
        return '{{%coursesectionitem}}';
    }

    /**
     * @inheritdoc
     */
    public function rules()
    {
        return [
            [['courseSectionItemId', 'name', 'order', 'created_at', 'updated_at'], 'required'],
            [['created_at', 'updated_at', 'order'], 'integer'],
            [['courseSectionItemId', 'courseSectionId'], 'string', 'max' => 21],
            [['name'], 'string', 'max' => 80],
            [['status'], 'string', 'max' => 3],
            [['courseSectionId'], 'exist', 'skipOnError' => true, 'targetClass' => CourseSection::className(), 'targetAttribute' => ['courseSectionId' => 'courseSectionId']],
        ];
    }

    /**
     * @inheritdoc
     */
    public function attributeLabels()
    {
        return [
            'courseSectionItemId' => Yii::t('app', 'Course Section Item ID'),
            'courseSectionId' => Yii::t('app', 'Course Section ID'),
            'name' => Yii::t('app', 'Name'),
            'order' => Yii::t('app', 'Order'),
            'created_at' => Yii::t('app', 'Created At'),
            'updated_at' => Yii::t('app', 'Updated At'),
            'status' => Yii::t('app', 'Status'),
        ];
    }

    /**
     * @return \yii\db\ActiveQuery
     */
    public function getCourseSection()
    {
        return $this->hasOne(CourseSection::className(), ['courseSectionId' => 'courseSectionId']);
    }
}
