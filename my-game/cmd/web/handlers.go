package main

import (
	"encoding/json"
	"fmt"
	"mygame.com/pkg/models"

	"io/ioutil"
	"net/http"
)

/***
save login as object
*/
func (app *application) savePlayer(w http.ResponseWriter, r *http.Request) {

	// parse r body as byte and then to player object
	b, err := ioutil.ReadAll(r.Body)
	if err != nil {
		app.serverError(w, err)
	}
	p := models.Player{}
	if err := json.Unmarshal(b, &p); err == nil {
		id , err := app.dbModel.SavePlayer(p)
		if err == nil {
			fmt.Fprint(w , id)
		}else {
			app.serverError(w, err)
		}

	}else{
		app.serverError(w, err)
	}
}

/***
update player as object
*/
func (app *application) updatePlayer(w http.ResponseWriter, r *http.Request) {

	// parse r body as byte and then to player object
	b, err := ioutil.ReadAll(r.Body)
	if err != nil {
		app.serverError(w, err)
	}
	p := models.Player{}
	if err := json.Unmarshal(b, &p); err != nil {
		app.serverError(w, err)
	}else if err = app.dbModel.UpdatePlayer(p); err != nil {
		app.serverError(w, err)
	}
}
