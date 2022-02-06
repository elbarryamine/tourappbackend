import { Knex } from 'knex'
import knex from '../../services/knex'
import { validateTour } from '../../services/functions/validate'
import {
  TourArgsInterface,
  TourSearchArgsInterface,
  CreateTourArgsInterface,
  DeleteTourArgsInterface,
} from './tours.interfaces'
import { errors } from '../../services/errors'
import { VerifyToken } from '../../services/functions/verifyToken'

export async function getToursResolver() {
  try {
    return new Promise((resolve, _) => {
      knex
        .transaction(async (trx) => {
          const tours = await trx('tour').select('*')
          resolve(tours)
        })
        .catch((err) => {
          throw new Error(errors.something_went_wrong)
        })
    })
  } catch (e: any) {
    throw new Error(e.message || errors.something_went_wrong)
  }
}
export async function searchToursResolver(_: any, args: TourSearchArgsInterface) {
  try {
    return new Promise((resolve, _) => {
      knex
        .transaction(async (trx: Knex.Transaction<TourArgsInterface, any[]>) => {
          let query = trx('tour')
          // if search filter value given we chain query method (fn.method) to check for it
          const withTitle = (fn: any) =>
            fn.where('name', 'like', `%${args.search}%`).orWhere('description', 'like', `%${args.search}%`)
          const withCategory = (fn: any) => fn.where('category', 'like', `%${args.type}%`)
          const withMinPrice = (fn: any) => fn.andWhere('price', '>', args.priceRangeMin)
          const withMaxPrice = (fn: any) => fn.andWhere('price', '<', args.priceRangeMax)
          const withDuration = (fn: any) => fn.andWhere('duration', '=', args.duration)
          if (args.search) query = withTitle(query)
          if (args.type) query = withCategory(query)
          if (args.priceRangeMin) query = withMinPrice(query)
          if (args.priceRangeMax) query = withMaxPrice(query)
          if (args.duration) query = withDuration(query)
          const tours = await query
          resolve(tours)
        })
        .catch((err) => {
          throw new Error(errors.something_went_wrong)
        })
    })
  } catch (e: any) {
    throw new Error(e.message || errors.something_went_wrong)
  }
}
export async function createTourResolver(_: any, args: CreateTourArgsInterface, ctx: any) {
  try {
    // check if have access
    VerifyToken(ctx)
    if (!validateTour(args)) throw new Error(errors.missing_access_permission)
    return await knex.transaction(async (trx: Knex.Transaction<CreateTourArgsInterface, any[]>) => {
      const tour = {
        name: args.name,
        description: args.description,
        discount: args.discount,
        duration: args.duration,
        price: args.price,
        rating: args.rating,
        location: args.location,
        features: args.features,
        category: args.category,
        createdBy: '2',
        mainImage: [''],
        images: '',
      }
      const dbTour = {
        name: args.name,
        description: args.description,
        discount: args.discount,
        duration: args.duration,
        price: args.price,
        rating: args.rating,
        createdBy: '2',
        mainImage: '',
        location: JSON.stringify(args.location),
        features: JSON.stringify(args.features),
        category: JSON.stringify(args.category),
        images: JSON.stringify(['']),
      }
      await trx('tour')
        .insert(dbTour)
        .catch((e) => {
          throw new Error(errors.something_went_wrong)
        })
      return tour
    })
  } catch (e: any) {
    throw new Error(e.message || errors.something_went_wrong)
  }
}

export async function deleteTourResolver(_: any, args: DeleteTourArgsInterface, ctx: any) {
  // check if have access
  VerifyToken(ctx)
  try {
    await knex
      .table('tour')
      .where('id', '=', args.id)
      .del()
      .catch(() => new Error(errors.something_went_wrong))
    return true
  } catch (e: any) {
    throw new Error(e.message || errors.something_went_wrong)
  }
}
