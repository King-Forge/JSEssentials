const breakfastMenu = ['Pancakes', 'Eggs Benedict', 'Oatmeal', 'Frittata'];
const maincourseMenu = ['Steak', 'Pasta', 'Burger', 'Salmon'];
const dessertMenu = ['Cake', 'Ice Cream', 'Pudding', 'Fruit Salad'];

//"iterate" through breakfast array using map and join
document.getElementById("breakfastTotalItems").innerHTML = `<p>There are ${breakfastMenu.length} total items on the Breakfast menu</p>`;
const breakfastMenuItemsHTML = breakfastMenu.map((item, index) => `<p>Item ${index + 1}: ${item}</p>`).join('');
document.getElementById('breakfastMenuItems').innerHTML = breakfastMenuItemsHTML;

//iterate through maincourse array using forEach
document.getElementById("maincourseTotalItems").innerHTML = `<p>There are ${maincourseMenu.length} total items on the Main Course menu</p>`;
let maincourseItem = '';
maincourseMenu.forEach((item, index) => {
    maincourseItem += `<p>Item ${index + 1}: ${item}</p>`;});
document.getElementById('maincourseMenuItems').innerHTML = maincourseItem;

//good old fasioned for loop, still the best
document.getElementById("dessertTotalItems").innerHTML = `<p>There are ${dessertMenu.length} total items on the Dessert menu</p>`;
let dessertItem = '';
for (let i = 0; i < dessertMenu.length; i++) {
    dessertItem += `<p>Item ${i + 1}: ${dessertMenu[i]}</p>`;}
document.getElementById('dessertMenuItems').innerHTML = dessertItem;