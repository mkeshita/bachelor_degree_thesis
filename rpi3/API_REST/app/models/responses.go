package models

// MessageAPIM should be used for common JSON responses
type MessageAPIM struct {
	Message string `json:"message"`
}

// ErrorAPIM should be used for resposes containing a JSON with an error message
type ErrorAPIM struct {
	Error string `json:"error"`
}

// ReservationAPIM should be used to serve a reservation details
type ReservationAPIM struct {
	Classroom string `json:"classroom"`
	Subject   string `json:"subject"`
	Professor string `json:"professor"`
	Datetime  string `json:"datetime"`
}

// TransactionInfoAPIM should be use to inform about transaction info
// for example, when creating or updating a reservation
type TransactionInfoAPIM struct {
	ID     string `json:"reservation ID"`
	Status string `json:"status"`
}
