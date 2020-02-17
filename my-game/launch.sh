rice clean ;
cd ./cmd/web ;
rice embed-go ;
sudo go build ;
cd .. ;
cd .. ;
sudo go run ./cmd/web ;