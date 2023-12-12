// Generador de contraseñas seguras:
// ¿Como funciona?
// Crea una página que tendrá lo siguiente:

// Tendrá entre 12 caracteres como mínimo y 50 de máximo. Se podrá elegir el número de caracteres
// Se compondrá de mayúsculas, minúsculas, números y símbolos. Mínimo una de cada.
// Tendremos un input dónde meteremos la longitud de la contraseña y un botón para que nos de el resultado.
// Dale estilo con CSS
// ¿Qué usaremos?
// Math.random() Para generar aleatoriedad
// Mayúsculas: "ABCDEFGHIJKLMNOPQRSTUVWXYZ"
// Minúsculas: "abcdefghijklmnopqrstuvwxyz"
// Números: "0123456789"
// Símbolos "!@#$%^&*()-_=+"
// PISTAS Y CONSEJOS
// Guarda cada uno de los datos (mayúsculas, minúsculas, símbolos y núemeros) en una variable para poder recorrerlos.
// Usa bucles y condicionales

const upperCase = ["A, B, C, D, E, F, , G, H, I, J, K, L, M, N, O, P, Q, R, S, T, U, V, W, X, Y, Z"]
const lowerCase = ["a, b, c, d, e, f, g, h, i, j, k, l, m, n, o, p, q, r, s, t, u, v, w, x, y, z"]
const numbers = ["0, 1, 2, 3, 4, 5, 6, 7, 8, 9"]
const symbols = ["!, @, #, $, %, ^, &, *, (, ), -, _, =, +"]

