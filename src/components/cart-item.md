```jsx
<div className="divide-y divide-gray-200">
  <CartItem 
    title='Rolex' 
    imageUrl='https://images.unsplash.com/photo-1596460107916-430662021049?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&amp;ixlib=rb-1.2.1&amp;auto=format&amp;fit=crop&amp;w=40&amp;h=40&amp;q=80' 
    price={7500} 
    quantity={2} />
  <CartItem 
    title='Cola' 
    imageUrl='https://images.unsplash.com/photo-1570831739435-6601aa3fa4fb?ixid=MnwyNDY1NjJ8MHwxfHJhbmRvbXx8fHx8fHx8fDE2MjYyNDYyMDc&ixlib=rb-1.2.1&auto=format&fit=crop&w=543&h=384&q=80' 
    price={2} 
    quantity={78}/>
  <CartItem 
    title='Sneakers' 
    imageUrl='https://images.unsplash.com/photo-1560769629-975ec94e6a86?ixid=MnwyNDY1NjJ8MHwxfHJhbmRvbXx8fHx8fHx8fDE2MjYyNDYyMDc&ixlib=rb-1.2.1&auto=format&fit=crop&w=543&h=384&q=80' 
    price={80} 
    quantity={9} />
</div>
```

<!-- Use render to render element other than `button`, e.g. `<a>` tag. -->

<!-- ```jsx
<Button
  variant="primary"
  render={(btnProps) => <a {...btnProps} href="https://google.com" />}
>
  Go to Google
</Button>
``` -->
