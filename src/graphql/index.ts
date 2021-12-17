import * as graphql from 'graphql';

export const DateType = new graphql.GraphQLScalarType({
	name: 'Date',
	serialize(value: any) {
		console.log(value);
		return value.getTime();
	},
	parseValue(value: any) {},
});
// id: string;
// 	name: string;
// 	category: string[];
// 	rating: number;
// 	location: string[];
// 	duration: string;
// 	description: string;
// 	features: string[];
// 	createdat: Date;
// 	price: number;
// 	discount: number;
// 	mainImage: string;
// 	images: string[];
// 	createdBy: string;
