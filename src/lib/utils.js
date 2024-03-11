import clsx from "clsx"
import twMerge from "tailwind-merge"

/**
 * Delays for ms amount of seconds.
 * @param {number} ms 
 * @returns 
 */
export const sleep = (ms) => new Promise((r) => setTimeout(r, ms))
export const isDevelopment = process.env.NODE_ENV === "development"

/**
 * Combines, merges, remove duplicates into valid classnames
 * @param  {...any} o 
 * @returns {string}
 */
export function cn(...o) {
  return twMerge(clsx(o))
}


/**
 * Creates Singleton so that no instance is created when hot-reloaded.
 *  used for prisma
 * @param {string} name 
 * @param {()=>Instance} instantiate 
 * @returns {Instance} instance
 */
export function createSingleton(name, instantiate) {
  const globalAny = globalThis
  const singleton = (globalAny[name]) ?? instantiate()
  if (process.env.NODE_ENV !== 'production')
    globalAny[name] = singleton
  return singleton
}


/**
 * Retrieves env variable.
 * @param {string} name 
 * @returns {string}
 */
export function env(name) {
  const val = process.env[name]
  if (!val) throw new Error(`Environment variable "${name}" not found!`)
  return val
}