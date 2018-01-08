<?php

namespace app\models;

use Yii;
use yii\behaviors\TimestampBehavior;
use app\components\behaviors\SearchBehavior;

/**
 * This is the model class for table "{{%school}}".
 *
 * @property string $schoolId
 * @property string $userId
 * @property string $locationId
 * @property string $name
 * @property string $about
 * @property string $description
 * @property string $abn
 * @property string $cricos
 * @property integer $yearEstablised
 * @property integer $rating
 * @property string $status
 *
 * @property Course[] $courses
 * @property Media[] $media
 * @property Rating[] $ratings
 * @property Relationship[] $relationships
 * @property Location $location
 * @property User $user
 * @property Schoolawards[] $schoolawards
 * @property Schoolcampi[] $schoolcampis
 * @property Schoolfeatures[] $schoolfeatures
 */
class School extends \yii\db\ActiveRecord
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
        return '{{%school}}';
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
                    $model->orderBy('name ASC, yearEstablised ASC');
                    $model->joinWith([
                        'location',
                        'location.geography',
                    ]);
                    //$model->select(['name']);
                    $model->orFilterWhere(['like', 'tbl_school.name', $term]);
                    $model->orFilterWhere(['like', 'tbl_geography.cityName', $term]);
                    $model->andFilterWhere(['tbl_school.status' => 'ACT']);
                },
                'searchFields' => function ($model) {
                    /** @var self $model */
                    return [
                        'type' => 'School',
                        'schoolId' => $model->schoolId,
                        'name' => $model->name,
                        'description' => strip_tags($model->description),
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
            [['schoolId', 'userId', 'name', 'about', 'description', 'abn', 'cricos', 'yearEstablised', 'rating'], 'required'],
            [['description'], 'string'],
            [['yearEstablised', 'rating'], 'integer'],
            [['schoolId', 'userId', 'locationId'], 'string', 'max' => 21],
            [['name'], 'string', 'max' => 120],
            [['about'], 'string', 'max' => 255],
            [['cricos'], 'string', 'max' => 15],
            [['status'], 'string', 'max' => 3],
            [['cricos'], 'unique'],
            [['abn'], 'unique'],
            [['abn'], 'string', 'min' => 11],
            ['abn', 'validateABN'],
            [['locationId'], 'exist', 'skipOnError' => true, 'targetClass' => Location::className(), 'targetAttribute' => ['locationId' => 'locationId']],
            [['userId'], 'exist', 'skipOnError' => true, 'targetClass' => User::className(), 'targetAttribute' => ['userId' => 'userId']],
        ];
    }

    public function validateABN($attribute, $params)
    {
        $weights = array(10, 1, 3, 5, 7, 9, 11, 13, 15, 17, 19);
        // strip anything other than digits
        $abn = str_replace("_", "", $this->$attribute);
        $abn = preg_replace("/[^\d]/","", $abn);

        // apply ato check method
        if(strlen($abn) == 11) {
            $sum = 0;
            foreach ($weights as $position => $weight) {
                $digit = $abn[$position] - ($position ? 0 : 1);
                $sum += $weight * $digit;
            }
            
            $valid = ($sum % 89);
            if ($valid != 0)
                $this->addError($attribute, 'ABN is not valid!');
        } else {
            $this->addError($attribute, 'ABN should be 11 characters!');
        }
    }

    public function validatePassword($attribute, $params)
    {
        // ^(?=.*[a-z])(?=.*[A-Z])(?=.*[\d,.;:]).+$
        // (?=^.{8,}$)((?=.*\d)|(?=.*\W+))(?![.\n])(?=.*[A-Z])(?=.*[a-z]).*$
        if (preg_match('/^(?=.*\d).*$/', !$this->attribute)) {
            $this->addError($attribute, 'Incorrect Password.');
        }
    }

    public function checkNewPassword($attribute, $params)
    {
        /*if($this->newPassword != $this->$attribute)
            $this->addError($attribute, "Passwords don't match");*/
    }

    public function scenarios() 
    {
       $scenarios = parent::scenarios(); 
       $scenarios['register'] = ['name', 'abn', 'cricos', 'status']; 
       return $scenarios; 
    }

    public function fields()
    {
        $fields = parent::fields();
        $fields[] = 'courses';
        $fields[] = 'images';
        $fields[] = 'ratings';
        $fields[] = 'relationships';
        $fields[] = 'location';
        $fields[] = 'user';
        $fields[] = 'schoolAwards';
        $fields[] = 'schoolCampis';
        $fields[] = 'schoolFeatures';
        return $fields;
    }

    /**
     * @inheritdoc
     */
    public function attributeLabels()
    {
        return [
            'schoolId' => Yii::t('app', 'School ID'),
            'userId' => Yii::t('app', 'User ID'),
            'locationId' => Yii::t('app', 'Location ID'),
            'name' => Yii::t('app', 'Name'),
            'about' => Yii::t('app', 'About'),
            'description' => Yii::t('app', 'Description'),
            'abn' => Yii::t('app', 'ABN'),
            'cricos' => Yii::t('app', 'CRICOS'),
            'yearEstablised' => Yii::t('app', 'Year Establised'),
            'rating' => Yii::t('app', 'Rating'),
            'status' => Yii::t('app', 'Status'),
            'created_at' => Yii::t('app', 'Created At'),
            'updated_at' => Yii::t('app', 'Updated At'),
        ];
    }

    public function toArrayCourse(array $fields = [], array $expand = [], $recursive = false) {
        $fields = parent::fields();
        return parent::toArray($fields, $expand, $recursive);
    }

    public function isComplete()
    {
        if(is_null($this->location) || $this->yearEstablised == 0 || empty($this->about) || $this->status != self::STATUS_ACTIVE)
            return false;

        return true;
    }

    /**
     * @return \yii\db\ActiveQuery
     */
    public function getCourses()
    {
        return $this->hasMany(Course::className(), ['schoolId' => 'schoolId']);
    }

    /**
     * @return \yii\db\ActiveQuery
     */
    public function getMedia()
    {
        return $this->hasMany(Media::className(), ['schoolId' => 'schoolId']);
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
        return $this->hasMany(Rating::className(), ['schoolId' => 'schoolId']);
    }

    /**
     * @return \yii\db\ActiveQuery
     */
    public function getRelationships()
    {
        return $this->hasMany(Relationship::className(), ['schoolId' => 'schoolId']);
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
    public function getUser()
    {
        return $this->hasOne(User::className(), ['userId' => 'userId']);
    }

    /**
     * @return \yii\db\ActiveQuery
     */
    public function getSchoolAwards()
    {
        return $this->hasMany(SchoolAwards::className(), ['schoolId' => 'schoolId']);
    }

    /**
     * @return \yii\db\ActiveQuery
     */
    public function getSchoolCampis()
    {
        return $this->hasMany(SchoolCampi::className(), ['schoolId' => 'schoolId']);
    }

    /**
     * @return \yii\db\ActiveQuery
     */
    public function getSchoolFeatures()
    {
        return $this->hasMany(SchoolFeatures::className(), ['schoolId' => 'schoolId']);
    }
}
