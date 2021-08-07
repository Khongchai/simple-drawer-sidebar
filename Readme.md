Instruction

Make sure the css file is imported properly.

```js
import sidebarStyle from "../whereever/thefile.css
```
<small> The css file is already imported by default. If you change the relative location of the css file, make sure to change the import as well.</small>

Then simply import and integrate into any React component. 

```jsx
 <>
    <Sidebar backgroundColor="white" mainElemsTag="h1" />
    <EnlargedImage />
    <Flex justify="center">
      <GridContainer width="100%" height="100%" maxWidth="2000px">
        <Box className="markdown" gridColumn="content-begin / content-end">
          {children}
        </Box>
      </GridContainer>
    </Flex>
  </>
```

The component is a fixed-position component, so place it anywhere as long as it doesn't disrupt the siblings flow in components like the ones with lobotomized-owl selector or flex components.

There are 4 props you can pass, but only 3 at once.
You can choose to either have the Sidebar populate its items by looking up the class or the tag.

Here's the type:

```tsx
type SidebarProps = {
  backgroundColor?: string;
  /**
   * Defaults to 1000
   */
  zIndex?: number;
} & (
  | {
      mainElemsTag: string;
      mainElemsClass?: never;
    }
  | {
      mainElemsTag?: never;
      mainElemsClass: string;
    }
);
```
