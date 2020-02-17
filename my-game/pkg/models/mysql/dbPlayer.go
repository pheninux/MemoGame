package mysql

import "mygame.com/pkg/models"

func (db *DataModel) SavePlayer(p models.Player) (uint, error){
	err := db.Db.Debug().Create(&p).Error
    return p.ID , err
}

func (db *DataModel) UpdatePlayer(p models.Player) error {
	return db.Db.Debug().Save(&p).Error

}
