var config = {
  address: "localhost",
  port: 8080,
  language: "tr",
  timeFormat: 24,
  units: "metric",

  modules: [
    {
      module: "clock",
      position: "top_left"
    },
    {
      module: "calendar",
      header: "Etkinlikler ve Özel Günler",
      position: "top_left",
      config: {
        calendars: [
          {
            symbol: "calendar-check",
            url: "webcal://www.calendarlabs.com/ical-calendar/ics/76/Turkey_Holidays.ics"
          }
        ]
      }
    },
    {
      module: "weather",
      position: "top_right",
      config: {
        weatherProvider: "openweathermap",
        type: "current",
        location: "Izmir",
        locationID: "311046",
        apiKey: "" 
      }
    },
    {
      module: "compliments",
      position: "lower_third",
      config: {
        compliments: {
          anytime: ["Sistem Aktif - İyi Çalışmalar"],
          morning: ["Günaydın", "Güne hazır mısın?"],
          afternoon: ["İyi öğlenler", "Proje üzerinde çalışmaya devam"],
          evening: ["İyi akşamlar", "Günün değerlendirmesini yapma vakti"],
          special_days: {
            "2026-01-01": "Mutlu Yıllar",
            "10-29": "Cumhuriyet Bayramı"
          }
        }
      }
    },
    {
      module: "newsfeed",
      position: "bottom_bar",
      config: {
        feeds: [
          {
            title: "Güncel Haberler",
            url: "https://www.ntv.com.tr/son-dakika.rss"
          }
        ]
      }
    },
    {
      module: "MMM-NotePad",
      position: "top_right",
      header: "Not Defteri",
      config: {
        notes: []
      }
    }
  ]
};

if (typeof module !== "undefined") { module.exports = config; }