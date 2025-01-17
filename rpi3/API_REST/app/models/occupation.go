package models

// OccupationStats represents classrooms occupation statistics
type OccupationStats struct {
	Linux         int
	Windows       int
	Shutdown      int
	TimeOut       int
	LoginsLinux   int
	LoginsWindows int
	PXE           int
	Computers     []int
}

// Occupation represents classrooms occupation
type Occupation struct {
	F16 OccupationStats
	F18 OccupationStats
	C05 OccupationStats
	C06 OccupationStats
}
