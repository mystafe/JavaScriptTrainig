let customerData;
fetch("https://northwind.vercel.app/api/customers")
  .then((response) => response.json())
  .then((data) => {
    customerData = data;
    // console.log("Customer", customerData);
    // console.log("Kaç A var?", findA());
    // console.log("ID si CENTC olan customer", findCustomerCENTC());
    // console.log("City London olan kaç customer var?", findLondonCustomers());
    // console.log("Country France olan customer lar", findFranceCustomers());
    // console.log("UpperCase company'ler", upperCaseCompanyNames());
  })
  .catch((error) => {
    console.error("Error:", error);
  });

const fetchCustomerData = function () {
  let tableContent = "";
  customerData.forEach((customer) => {
    tableContent += `<tr>
      <td>${customer.companyName}</td>
      <td>${customer.contactName}</td>
      <td>${customer.contactTitle}</td>  
      <td>${customer.address.street}</td>
      <td>${customer.address.city}</td>
      <td>${customer.address.region}</td>
      <td>${customer.address.postalCode}</td>
      <td>${customer.address.country}</td>
      <td>${customer.address.phone}</td>    
    </tr>`;
  });
  document.getElementById("Content").innerHTML = tableContent;
};

//Kaç a var?
const findA = function () {
  let count = 0;
  customerData.forEach((customer) => {
    if (customer.companyName.includes("a")) {
      count++;
    }
  });
  return count;
};

//ID si ‘CENTC’ olan customer ı console a yazdır.
const findCustomerCENTC = function () {
  let customer;
  customerData.forEach((item) => {
    if (item.id == "CENTC") {
      customer = item;
    }
  });
  return customer;
};

const deleteData = function () {
  document.getElementById("Content").innerHTML = "";
};

//City London olan kaç customer var?
const findLondonCustomers = function () {
  let count = 0;
  customerData.forEach((customer) => {
    if (customer.address.city == "London") {
      count++;
    }
  });
  return count;
};

//Country France olan customer ları console a yazdır
const findFranceCustomers = function () {
  let customers = [];
  customerData.forEach((customer) => {
    if (customer.address.country == "France") {
      customers.push(customer);
    }
  });
  return customers;
};

//Tüm companyName leri büyük ( upper ) console a yazdır
const upperCaseCompanyNames = function () {
  let upperCaseCompanyNames = [];
  customerData.forEach((customer) => {
    upperCaseCompanyNames.push(customer.companyName.toUpperCase());
  });
  return upperCaseCompanyNames;
};

//Stok adedi 10 dan düşük olanları ekrana yazdır.

let productdata;
fetch("https://northwind.vercel.app/api/products")
  .then((data) => data.json())
  .then((data) => {
    productdata = data;
    console.info("Product", productdata);
    console.log("10'dan az stoklu ürünler", productWithLessStock());
    console.log(
      "10'dan az stoklu ürünler with Filter",
      productWithLessStock2()
    );
  })
  .catch((e) => console.error("Error: ", e));

//Stok adeti 10'dan küçük olanları ekrana yazdır.
const productWithLessStock = () => {
  var lessStocks = [];
  productdata.forEach((p) => {
    if (p.unitsInStock < 10) lessStocks.push(p);
  });

  return lessStocks;
};
const productWithLessStock2 = () => {
  let lessStocks = productdata.filter((p) => p.unitsInStock < 10);
  return lessStocks;
};

let orderdata;
const orderUrl = "https://northwind.vercel.app/api/orders";
fetch(orderUrl)
  .then((d) => d.json())
  .then((data) => {
    orderdata = data;
    console.log("Order Data: ", data),
      console.log("Late Orders", lateShippedOrders());
    console.log("1996 siparişleri", orderInSpecificYear(1996));
  })
  .catch((e) => console.error("error", e));

//Late orders
const lateShippedOrders = () => {
  return orderdata
    .filter(
      (o) =>
         new Date(o.requiredDate) < new Date(o.shippedDate)
    )
};
//Orders in 1996
const orderInSpecificYear = (year) => {
  return orderdata.filter((o) => new Date(o.orderDate).getFullYear() == year);
};
