import { Elysia } from "elysia";

const app = new Elysia()
.get("/", () => "Hello Elysia")
.get("/hello", () => "Hello World")

.get("/hello/:name/:age", ({ params }) => `Hello ${params.name} ${params.age}`)

.get('/customers', () => {
  const customers = [
    { name: 'John', age: 20 },
    { name: 'Jane', age: 21 },
    { name: 'Jim', age: 22 },
    { name: 'Jill', age: 23 },
  ]
  return customers
})
.get('/customers/:id', ({params}) => {
  const customers = [
    { id: 0,name: 'John', age: 20 },
    { id: 1,name: 'Jane', age: 21 },
    { id: 2,name: 'Doe', age: 22 },
    { id: 3,name: 'Smith', age: 23 },
  ]

  const customer = customers.find(customer => customer.id === Number(params.id))

  if (!customers) {
    return { error: 'Customers not found'}
}

 return customers
})
//GET = แสดงข้อมูล (SELECT)
.get('/customers/query', ({query}) => {
 const name = query.name
 const age = query.age
  return `query: ${name} ${age}`
})

.get('/customers/status', () => {
  return new Response('Hello World', {status: 200})
})
.listen(3000) 
//POST = เพิ่มข้อมูล (INSERT)
.post("/customers/create", ({ body }: { body: any }) => {
  const name = body.name;
  const age= body.age;

    return `body: ${name} ${age}`;
  })
  .listen(3000) 
//PUT = แก้ไขข้อมูล (UPDATE)
  .put("/customers/update/:id", ({ params, body } : { params: any; body: any }) => {
    const id = params.id;
    const name =body.name;
    const age = body.age;
    return `params: ${id} body: ${name} ${age}`;
  })
  .listen(3000)  

  .put("/customers/updateall/:id", ({ params, body } : { 
    params: {id: string}; 
    body: {name: string; age: number} 
  }) => {

    const id = params.id;
    const name =body.name;
    const age = body.age;

    return `params: ${id} body: ${name} ${age}`;
  })
  .listen(3000)  
  
  //DELETE = ลบข้อมูล (DELETE)
  .delete("/customers/delete/:id", ({ params } : { params: {id: string} }) => {
    const id = params.id;
    return `params: ${id}`;
  })
  .listen(3000)


console.log(
  `🦊 Elysia is running at ${app.server?.hostname}:${app.server?.port}`
);
