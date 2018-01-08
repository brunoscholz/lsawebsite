<?php

namespace app\models;

use Yii;
use yii\behaviors\TimestampBehavior;
use app\components\behaviors\SearchBehavior;

/**
 * This is the model class for table "{{%course}}".
 *
 * @property string $courseId
 * @property string $courseTypeId
 * @property string $schoolId
 * @property string $schoolCampiId
 * @property integer $startDate
 * @property integer $endDate
 * @property string $periodOfDay
 * @property double $cost
 * @property double $discount
 * @property string $name
 * @property string $about
 * @property string $remarks
 * @property integer $rating
 * @property integer $created_at
 * @property integer $updated_at
 * @property string $status
 *
 * @property Schoolcampi $schoolCampi
 * @property Coursetype $courseType
 * @property School $school
 * @property Courseenroll[] $courseenrolls
 * @property Coursefeatures[] $coursefeatures
 * @property Courseinstructor[] $courseinstructors
 * @property Coursesection[] $coursesections
 * @property Media[] $media
 * @property Rating[] $ratings
 * @property Relationship[] $relationships
 */
class Course extends \yii\db\ActiveRecord
{
    const STATUS_ACTIVE = 'ACT';
    const STATUS_REMOVED = 'REM';
    const STATUS_BANNED = 'BAN';
    const STATUS_NOT_VERIFIED = 'PEN';

    public static function statusArray() {
        return [
            self::STATUS_ACTIVE,
            self::STATUS_NOT_VERIFIED,
            self::STATUS_BANNED,
            self::STATUS_REMOVED,
        ];
    }

    /**
     * @inheritdoc
     */
    public static function tableName()
    {
        return '{{%course}}';
    }

    /**
     * @inheritdoc
     */
    public static function primaryKey()
    {
        return ['schoolId'];
    }

    /**
     * @inheritdoc
     */
    public function behaviors()
    {
        return [
            TimestampBehavior::className(),
            'search' => [
                'class' => SearchBehavior::className(),
                'searchScope' => function ($model, $term) {
                    /** @var \yii\db\ActiveQuery $model */
                    $model->orderBy('startDate ASC, cost ASC');
                    $model->joinWith([
                        'school',
                        'schoolCampi',
                        'school.location',
                        'school.location.geography',
                    ]);
                    
                    $model->orFilterWhere(['like', 'tbl_course.name', $term]);
                    $model->orFilterWhere(['like', 'tbl_geography.cityName', $term]);
                    $model->andFilterWhere(['tbl_course.status' => 'ACT']);
                    //$model->select(['tbl_course.name', 'cost']);
                },
                'searchFields' => function ($model) {
                    /** @var self $model */
                    /*$temp = $model->toArray();
                    $tmpMedia = array();
                    foreach ($model->media as $media) {
                        $tmpMedia[] = $media->toArray();
                    }
                    $temp['media'] = $tmpMedia;
                        'model' => $temp,*/


                    return [
                        'type' => 'Course',
                        'courseId' => $model->courseId,
                        'name' => $model->name,
                        'about' => strip_tags($model->about),
                        'cost' => $model->cost,
                        'images' => $model->images,
                        'reviews' => $model->ratings,
                        //['name' => 'url', 'value' => $model->url, 'type' => SearchBehavior::FIELD_KEYWORD],
                        // ['name' => 'model', 'value' => 'page', 'type' => SearchBehavior::FIELD_UNSTORED],
                    ];
                }
            ],
        ];
    }

    /**
     * @inheritdoc
     */
    public function rules()
    {
        return [
            [['courseId', 'startDate', 'endDate', 'periodOfDay', 'cost', 'name', 'about', 'remarks', 'rating', 'created_at', 'updated_at'], 'required'],
            [['startDate', 'endDate', 'rating', 'created_at', 'updated_at'], 'integer'],
            [['periodOfDay', 'remarks'], 'string'],
            [['cost', 'discount'], 'number'],
            [['courseId', 'courseTypeId', 'schoolId', 'schoolCampiId'], 'string', 'max' => 21],
            [['name'], 'string', 'max' => 120],
            [['about'], 'string', 'max' => 255],
            [['status'], 'string', 'max' => 3],
            [['schoolCampiId'], 'exist', 'skipOnError' => true, 'targetClass' => SchoolCampi::className(), 'targetAttribute' => ['schoolCampiId' => 'schoolCampiId']],
            [['courseTypeId'], 'exist', 'skipOnError' => true, 'targetClass' => CourseType::className(), 'targetAttribute' => ['courseTypeId' => 'courseTypeId']],
            [['schoolId'], 'exist', 'skipOnError' => true, 'targetClass' => School::className(), 'targetAttribute' => ['schoolId' => 'schoolId']],
        ];
    }

    public function fields()
    {
        $fields = parent::fields();
        $fields[] = 'courseType';
        $fields[] = 'images';
        /*$fields[] = 'school';
        $fields[] = 'schoolCampi';*/
        $fields[] = 'courseEnrolls';
        $fields[] = 'courseFeatures';
        $fields[] = 'courseInstructors';
        $fields[] = 'courseSections';
        $fields[] = 'ratings';
        $fields[] = 'relationships';
        return $fields;
    }

    /*public function toArray(array $fields = [], array $expand = [], $recursive = false) {
        if (empty($fields)) {
            $fields = ['username', 'id'];
        }

        return parent::toArray($fields, $expand, $recursive);
    }*/

    /*public function extraFields ()
    {
        return ["media", "school", "courseType", "courseFeatures"];
        $fields = array();
        $fields[] = 'courseType';
        $fields[] = 'school';
        $fields[] = 'schoolCampi';
        $fields[] = 'courseEnrolls';
        $fields[] = 'courseFeatures';
        $fields[] = 'courseInstructors';
        $fields[] = 'courseSections';
        $fields[] = 'media';
        $fields[] = 'ratings';
        $fields[] = 'relationships';
        return $fields;
    }*/

    /**
     * @inheritdoc
     */
    public function attributeLabels()
    {
        return [
            'courseId' => Yii::t('app', 'Course ID'),
            'courseTypeId' => Yii::t('app', 'Course Type ID'),
            'schoolId' => Yii::t('app', 'School ID'),
            'schoolCampiId' => Yii::t('app', 'School Campi ID'),
            'startDate' => Yii::t('app', 'Start Date'),
            'endDate' => Yii::t('app', 'End Date'),
            'periodOfDay' => Yii::t('app', 'Period Of Day'),
            'cost' => Yii::t('app', 'Cost'),
            'discount' => Yii::t('app', 'Discount'),
            'name' => Yii::t('app', 'Name'),
            'about' => Yii::t('app', 'About'),
            'remarks' => Yii::t('app', 'Remarks'),
            'rating' => Yii::t('app', 'Rating'),
            'created_at' => Yii::t('app', 'Created At'),
            'updated_at' => Yii::t('app', 'Updated At'),
            'status' => Yii::t('app', 'Status'),
        ];
    }

    /**
     * @return \yii\db\ActiveQuery
     */
    public function getSchoolCampi()
    {
        return $this->hasOne(SchoolCampi::className(), ['schoolCampiId' => 'schoolCampiId']);
    }

    /**
     * @return \yii\db\ActiveQuery
     */
    public function getCourseType()
    {
        return $this->hasOne(CourseType::className(), ['courseTypeId' => 'courseTypeId']);
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
    public function getCourseEnrolls()
    {
        return $this->hasMany(CourseEnroll::className(), ['courseId' => 'courseId']);
    }

    /**
     * @return \yii\db\ActiveQuery
     */
    public function getCourseFeatures()
    {
        return $this->hasMany(CourseFeatures::className(), ['courseId' => 'courseId']);
    }

    /**
     * @return \yii\db\ActiveQuery
     */
    public function getCourseInstructors()
    {
        return $this->hasMany(CourseInstructor::className(), ['courseId' => 'courseId']);
    }

    /**
     * @return \yii\db\ActiveQuery
     */
    public function getCourseSections()
    {
        return $this->hasMany(CourseSection::className(), ['courseId' => 'courseId']);
    }

    /**
     * @return \yii\db\ActiveQuery
     */
    public function getMedia()
    {
        return $this->hasMany(Media::className(), ['courseId' => 'courseId']);
    }

    /**
     * @return \yii\db\ActiveQuery
     */
    public function getImages()
    {
        return $this->hasMany(Image::className(), ['imageId' => 'imageId'])
            ->via('media');
    }

    /**
     * @return \yii\db\ActiveQuery
     */
    public function getRatings()
    {
        return $this->hasMany(Rating::className(), ['courseId' => 'courseId']);
    }

    /**
     * @return \yii\db\ActiveQuery
     */
    public function getRelationships()
    {
        return $this->hasMany(Relationship::className(), ['courseId' => 'courseId']);
    }
}
