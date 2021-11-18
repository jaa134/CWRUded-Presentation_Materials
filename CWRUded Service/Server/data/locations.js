var CronJob = require('cron').CronJob;

const type = {
    ACADEMIC: 'academic',
    DINING: 'dining',
    GYM: 'gym'
}

class Rating {
    constructor(value, createdOn) {
        this.value = value;
        this.createdOn = createdOn;
    }
}
  
class Space {
    constructor(id, name) {
        this.id = id;
        this.name = name;
        this.history = [];
    }

    update(rating) {
        this.history.push(rating);
        if (this.history.length > 10) {
            this.history.shift();
        }
    }
}

class Location {
    constructor(id, type, name, latitude, longitude, spaces) {
        this.id = id;
        this.type = type;
        this.name = name;
        this.latitude = latitude;
        this.longitude = longitude;
        this.spaces = spaces.map(function(name, index) { return new Space(index, name); });
    }
}

class Data {
    
    constructor() {
        this.kelvinSmithLibrary    = new Location(0,  type.ACADEMIC, "Kelvin Smith Library",    41.507336, -81.609616,
            ["Basement", "1st Floor", "2nd Floor", "3rd Floor"]);
        this.vealeAthleticCenter   = new Location(1,  type.GYM,      "Veale Athletic Center",   41.500991, -81.606196,
            ["Weight Room", "Cardio Room", "Track"]);
        this.wayantAthleticCenter  = new Location(2,  type.GYM,      "Wyant Athletic Center",   41.514078, -81.603269,
            ["Weight Room", "Cardio Room"]);
        this.glennanBuilding       = new Location(3,  type.ACADEMIC, "Glennan Building",        41.501497, -81.607216,
            ["Circuits Lab", "Other"]);
        this.tomlinsonHall         = new Location(4,  type.DINING,   "Tomlinson Hall",          41.504047, -81.609620,
            ["Cafeteria", "Other"]);
        this.allenMemorialLibrary  = new Location(5,  type.ACADEMIC, "Allen Memorial Library",  41.505925, -81.608473,
            ["Library", "Ford Auditorium"]);
        this.searsThinkbox         = new Location(6,  type.ACADEMIC, "Sears think[box]",        41.500560, -81.605671,
            ["1st Floor", "2nd Floor", "3rd Floor", "4th Floor", "5th Floor", "6th Floor", "7th Floor"]);
        this.millisHall            = new Location(7,  type.ACADEMIC, "Millis Hall",             41.503981, -81.607245,
            ["Schmitt Auditorium", "Other"]);
        this.olinBuilding          = new Location(8,  type.ACADEMIC, "Olin Building",           41.502121, -81.607890,
            ["General"]);
        this.fribleyDiningHall     = new Location(9,  type.DINING,   "Fribley Dining Hall",     41.501051, -81.602680,
            ["General"]);
        this.nordHall              = new Location(10, type.ACADEMIC, "Nord Hall",               41.502529, -81.607873,
            ["General"]);
        this.strosackerAuditorium  = new Location(11, type.ACADEMIC, "Strosacker Auditorium",   41.503242, -81.607407,
            ["General"]);
        this.leutnerDiningHall     = new Location(12, type.DINING,   "Leutner Dining Hall",     41.513459, -81.605994,
            ["General"]);
        this.thwingCenter          = new Location(13, type.ACADEMIC, "Thwing Center",           41.507274, -81.608238,
            ["General"]);
        this.tinkhamVeale          = new Location(14, type.DINING,   "Tinkham Veale",           41.508091, -81.608659,
            ["General"]);
        this.theDenByDennys        = new Location(15, type.DINING,   "The DEN by Denny's",      41.512005, -81.606061,
            ["General"]);
        this.peterBLewisBuilding   = new Location(16, type.ACADEMIC, "Peter B. Lewis Building", 41.509895, -81.607980,
            ["General"]);
        this.binghamBuilding       = new Location(17, type.ACADEMIC, "Bingham Building",        41.502364, -81.606878,
            ["General"]);
        this.carltonCommons        = new Location(18, type.ACADEMIC, "Carlton Commons",         41.500161, -81.601842,
            ["General"]);
        this.crawfordHall          = new Location(19, type.ACADEMIC, "Crawford Hall",           41.504559, -81.609820,
            ["General"]);
        this.yostHall              = new Location(20, type.ACADEMIC, "Yost Hall",               41.503604, -81.608969,
            ["General"]);
        this.haydnHall             = new Location(21, type.ACADEMIC, "Haydn Hall",              41.508620, -81.607681,
            ["General"]);
        this.rockefellerBuilding   = new Location(22, type.ACADEMIC, "Rockefeller Building",    41.503632, -81.607824,
            ["General"]);
        this.whiteBuilding         = new Location(23, type.ACADEMIC, "White Building",          41.501936, -81.607477,
            ["General"]);
        this.wickendonBuilding     = new Location(24, type.ACADEMIC, "Wickenden Building",      41.503065, -81.608368,
            ["General"]);
        this.searsBuilding         = new Location(25, type.ACADEMIC, "Sears Building",          41.502775, -81.608057,
            ["General"]);
        this.smithBuilding         = new Location(26, type.ACADEMIC, "Smith Building",          41.502919, -81.606883,
            ["General"]);
        this.mandelSchool          = new Location(27, type.ACADEMIC, "Mandel School",           41.510659, -81.607099,
            ["General"]);
        this.writingResourceCenter = new Location(28, type.ACADEMIC, "Writing Resource Center", 41.511908, -81.605161,
            ["General"]);
        this.degraceHall           = new Location(29, type.ACADEMIC, "DeGrace Hall",            41.504162, -81.607116,
            ["General"]);
        this.clappHall             = new Location(30, type.ACADEMIC, "Clapp Hall",              41.503952, -81.606707,
            ["General"]);

        this.locations = [
            this.kelvinSmithLibrary,
            this.vealeAthleticCenter,
            this.wayantAthleticCenter,
            this.glennanBuilding,
            this.tomlinsonHall,
            this.allenMemorialLibrary,
            this.searsThinkbox,
            this.millisHall,
            this.olinBuilding,
            this.fribleyDiningHall,
            this.nordHall,
            this.strosackerAuditorium,
            this.leutnerDiningHall,
            this.thwingCenter,
            this.tinkhamVeale,
            this.theDenByDennys,
            this.peterBLewisBuilding,
            this.binghamBuilding,
            this.carltonCommons,
            this.crawfordHall,
            this.yostHall,
            this.haydnHall,
            this.rockefellerBuilding,
            this.whiteBuilding,
            this.wickendonBuilding,
            this.searsBuilding,
            this.smithBuilding,
            this.mandelSchool,
            this.writingResourceCenter,
            this.degraceHall,
            this.clappHall
        ]

        function sortByName(a, b) {
            var aName = a.name.toLowerCase();
            var bName = b.name.toLowerCase(); 
            return ((aName < bName) ? -1 : ((aName > bName) ? 1 : 0));
        }
    
        this.locations = this.locations.sort(sortByName);

        this.update();
    }

    update() {
        var self = this;
        setInterval(function() {
            self.updateLocations();
        }, 5000);


        //var self = this;
        //this.updateJob = new CronJob('0 * * * * *', function() {
        //    self.updateLocations();
        //}, null, true, 'America/New_York');
    }

    updateLocations() { 
        function randomCongestionValue (baseVal) {
            //value between (baseVal - 7) and (baseVal + 7)
            return baseVal + Math.floor((Math.random() * 14) - 7);
        }

        var currentDate = new Date();
        this.locations.forEach(function(location) {
            location.spaces.forEach(function(space) {
                var rating = new Rating(randomCongestionValue(23), currentDate);
                space.update(rating);
            });
        });
    }
}

module.exports = new Data();



