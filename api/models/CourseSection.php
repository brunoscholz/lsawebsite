<?php

namespace app\models;

use Yii;

/**
 * This is the model class for table "{{%coursesection}}".
 *
 * @property string $courseSectionId
 * @property string $courseId
 * @property string $name
 * @property string $order
 * @property integer $created_at
 * @property integer $updated_at
 * @property string $status
 *
 * @property Course $course
 * @property Coursesectionitem[] $coursesectionitems
 * @property Coursesectionresource[] $coursesectionresources
 */
class CourseSection extends \yii\db\ActiveRecord
{
    /**
     * @inheritdoc
     */
    public static function tableName()
    {
        return '{{%coursesection}}';
    }

    /**
     * @inheritdoc
     */
    public function rules()
    {
        return [
            [['courseSectionId', 'name', 'order', 'created_at', 'updated_at'], 'required'],
            [['created_at', 'updated_at', 'order'], 'integer'],
            [['courseSectionId', 'courseId'], 'string', 'max' => 21],
            [['name'], 'string', 'max' => 120],
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
            'courseSectionId' => Yii::t('app', 'Course Section ID'),
            'courseId' => Yii::t('app', 'Course ID'),
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
    public function getCourse()
    {
        return $this->hasOne(Course::className(), ['courseId' => 'courseId']);
    }

    /**
     * @return \yii\db\ActiveQuery
     */
    public function getCoursesectionitems()
    {
        return $this->hasMany(CourseSectionItem::className(), ['courseSectionId' => 'courseSectionId'])->orderBy(['order'=>SORT_ASC]);
    }

    /**
     * @return \yii\db\ActiveQuery
     */
    public function getCoursesectionresources()
    {
        return $this->hasMany(CourseSectionResource::className(), ['courseSectionId' => 'courseSectionId'])->orderBy(['order'=>SORT_ASC]);
    }
}
