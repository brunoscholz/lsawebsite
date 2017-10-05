<?php

namespace app\models;

use Yii;
use yii\web\UploadedFile;



/**
 * This is the model class for table "{{%image}}".
 *
 * @property string $imageId
 * @property string $large
 * @property string $thumb
 * @property string $status
 *
 * @property Media[] $media
 */
class Image extends \yii\db\ActiveRecord
{
    /**
     * @var UploadedFile[]
     */
    public $imageLarge;
    public $imageThumb;

    /**
     * @inheritdoc
     */
    public static function tableName()
    {
        return '{{%image}}';
    }

    /**
     * @inheritdoc
     */
    public function rules()
    {
        return [
            [['imageId', 'large', 'thumb'], 'required'],
            [['imageId'], 'string', 'max' => 21],
            [['large', 'thumb'], 'string', 'max' => 255],
            [['status'], 'string', 'max' => 3],
            [['imageLarge'], 'file', 'skipOnEmpty' => true, 'extensions' => 'png, jpg'],
            [['imageThumb'], 'file', 'skipOnEmpty' => true, 'extensions' => 'png, jpg'],
        ];
    }

    /**
     * @inheritdoc
     */
    public function attributeLabels()
    {
        return [
            'imageId' => Yii::t('app', 'Image ID'),
            'large' => Yii::t('app', 'Large'),
            'thumb' => Yii::t('app', 'Thumb'),
            'status' => Yii::t('app', 'Status'),
        ];
    }

    public static function findById($id)
    {
        return static::find()
            ->where(['like binary', 'pictureId', $id])
            ->one();
    }

    /**
     * @return \yii\db\ActiveQuery
     */
    public function getMedia()
    {
        return $this->hasMany(Media::className(), ['imageId' => 'imageId']);
    }

    /*public function beforeSave($insert)
    {
        if (parent::beforeSave($insert))
        {
            // ...custom code here...
            //http://ondetem-gn.com.br/uploads/userpics/4xsJ18K4J7dXr74jlWK_U--lvTY7tyF6.png
            $this->thumbnail = str_replace('http://ondetem-gn.com.br', '', $this->thumbnail);
            $this->cover = str_replace('http://ondetem-gn.com.br', '', $this->cover);

            return true;
        } else {
            return false;
        }
    }*/

    public function afterFind()
    {
        if(is_null($this->thumb) || empty($this->thumb))
            $this->thumb = 'assets/img/generic-avatar.png';
        elseif (strpos($this->thumb, 'generic') != true)
            $this->thumb = $this->thumb;
        
        if(is_null($this->large) || empty($this->large))
            $this->large = 'assets/img/generic-cover.jpg';
        elseif (strpos($this->large, 'generic') != true)
            $this->large = $this->large;
    }
}
