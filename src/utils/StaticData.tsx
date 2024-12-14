import moment from 'moment';
import config from '../config';
import {PRODUCT} from '../types/Products';

const getRandomNumber = (maxValue: number = 10) => {
  return Math.floor(Math.random() * maxValue) + 1;
};

const getItemsFromRandomNumber = (no: number) => {
  switch (no) {
    case 1:
      return {
        image: config.images.food_1,
        title: 'Chocolate Cake',
      };
    case 2:
      return {
        image: config.images.food_2,
        title: 'Garlic Bread',
      };

    case 3:
      return {
        image: config.images.food_3,
        title: 'Sweet Corn',
      };
    case 4:
      return {
        image: config.images.food_4,
        title: 'Mushroom',
      };
    case 5:
      return {
        image: config.images.food_1,
        title: 'Salad',
      };
    case 6:
      return {
        image: config.images.food_2,
        title: 'Roasted Potatoes',
      };
    case 7:
      return {
        image: config.images.food_3,
        title: 'Strawberry Shortcake',
      };
    case 8:
      return {
        image: config.images.food_4,
        title: 'Tomato',
      };
    case 9:
      return {
        image: config.images.food_1,
        title: 'Cabbage',
      };
    case 10:
      return {
        image: config.images.food_2,
        title: 'Beetroot',
      };
    default:
      return {
        image: config.images.food_4,
        title: 'Broccoli',
      };
  }
};

export const getProductCondtionFromRandomNumber = (no: number) => {
  switch (no) {
    case 1:
      return 'Poor';
    case 2:
      return 'Good';
    case 3:
      return 'New';
    default:
      return 'New';
  }
};

const getStaticProductList = () => {
  const PRODUCT_LIST: PRODUCT[] = [];
  for (let i = 0; i < 5; i++) {
    const randomNumber = getRandomNumber();
    const randCondtion = getRandomNumber(3);
    console.log('randCondtion: ', randCondtion);

    const r_items = getItemsFromRandomNumber(randomNumber);
    PRODUCT_LIST.push({
      product_id: i + 1,
      image: r_items.image,
      title: r_items.title,
      description:
        "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.\n\nLorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.\n\nLorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.\n\nLorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.",
      expiryDate: moment()
        .add(randomNumber, 'day')
        .format('dddd, DD MMM, yyyy'),
      productCondition: randCondtion,
    });
  }
  return PRODUCT_LIST;
};

export default {
  getStaticProductList,
};
