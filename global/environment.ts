
// En servidores como Heroku, ya nos provee de process.env
// Number(string) hace cast de string a number
export const SERVER_PORT: number = Number( process.env.PORT ) || 5000;