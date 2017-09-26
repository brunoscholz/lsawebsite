<?php

namespace app\models;

use Yii;

/**
 * This is the model class for table "{{%coursesectionresource}}".
 *
 * @property string $courseSectionResourceId
 * @property string $courseSectionId
 * @property string $name
 * @property string $path
 * @property integer $created_at
 * @property integer $updated_at
 * @property string $status
 *
 * @property Coursesection $courseSection
 */
class CourseSectionResource extends \yii\db\ActiveRecord
{
    /**
     * @inheritdoc
     */
    public static function tableName()
    {
        return '{{%coursesectionresource}}';
    }

    /**
     * @inheritdoc
     */
    public function rules()
    {
        return [
            [['courseSectionResourceId', 'name', 'path', 'order', 'created_at', 'updated_at'], 'required'],
            [['created_at', 'updated_at', 'order'], 'integer'],
            [['courseSectionResourceId', 'courseSectionId'], 'string', 'max' => 21],
            [['name'], 'string', 'max' => 80],
            [['path'], 'string', 'max' => 255],
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
            'courseSectionResourceId' => Yii::t('app', 'Course Section Resource ID'),
            'courseSectionId' => Yii::t('app', 'Course Section ID'),
            'name' => Yii::t('app', 'Name'),
            'path' => Yii::t('app', 'Path'),
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
