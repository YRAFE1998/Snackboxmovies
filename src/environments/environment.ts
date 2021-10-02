// This file can be replaced during build by using the `fileReplacements` array.
// `ng build` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.

export const environment = {
  production: false
};
export const tmdb_env = {
  base_url : "https://api.themoviedb.org/3",
  image_base_url: "https://image.tmdb.org/t/p/w500",
  API_KEY: "f36e1abd7b1bb7561a3768b154be7599"
}

export const auth_env = [
  {
    username:"yousef.refaat@gmail.com",
    password:"1234567890",
    id:"dfh85jg25fg2jfghmhg",
    token:'f36e1abd7b1bb7561a3768b154be7599'
  }
]
/*
 * For easier debugging in development mode, you can import the following file
 * to ignore zone related error stack frames such as `zone.run`, `zoneDelegate.invokeTask`.
 *
 * This import should be commented out in production mode because it will have a negative impact
 * on performance if an error is thrown.
 */
// import 'zone.js/plugins/zone-error';  // Included with Angular CLI.
