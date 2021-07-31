import { Box, Link, List, ListItem, Stack } from "@chakra-ui/react";
import React, { useEffect, useState } from "react";
import { StaticImage } from "gatsby-plugin-image";
import monitorScroll from "./monitorScroll";
import css from "./style.css;"

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

const Sidebar: React.FC<SidebarProps> = ({
  backgroundColor,
  zIndex,
  mainElemsClass,
  mainElemsTag,
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const [mainTopics, setMainTopics] = useState([]);

  useEffect(() => {
    const mainElems = mainElemsClass
      ? document.getElementsByClassName(mainElemsClass)
      : document.getElementsByTagName(mainElemsTag);
    if (mainElems.length > 0) {
      let tmp = [];
      for (let i = 0, length = mainElems.length; i < length; i++) {
        tmp.push(mainElems[i].innerHTML);
        mainElems[i].id = mainElems[i].innerHTML;
      }
      setMainTopics(tmp);
      monitorScroll(mainElems);
    }
  }, []);

  return (
    <Box
      bg={backgroundColor}
      position="fixed"
      height="100vh"
      top="0"
      right="0"
      className={isOpen ? "sidebar-opened" : "sidebar-closed"}
      zIndex={zIndex ? zIndex : 1000}
      onClick={() => setIsOpen((stat) => !stat)}
      transition=".3s"
      _hover={{ opacity: "1" }}
      cursor="pointer"
      overflowY={["scroll", null, null, "unset"]}
    >
      <Box
        width="fit-content"
        height="fit-content"
        position={["sticky", null, null, "absolute"]}
        top="50%"
      >
        <StaticImage alt="show-more-icon" src="./more_vertical.svg" />
      </Box>
      <Box>
        <List
          onClick={isOpen ? (e) => e.stopPropagation() : null}
          opacity={isOpen ? 1 : 0}
          pointerEvents={isOpen ? "unset" : "none"}
          color="black"
          whiteSpace="nowrap"
          transition=".1s"
          fontSize="lg"
          fontWeight="bold"
          display="flex"
          flexDir="column"
          p="4rem 2rem 4rem 2rem"
          //space for user to click on to close the side bar
          ml="4rem"
          alignItems="flex-end"
          as={Stack}
          spacing="2rem"
        >
          {mainTopics.map((topic) => (
            <ListItem
              key={topic}
              className="hover-gradient"
              id={topic + "-sidebar-item"}
              transition=".3s"
              borderRight="8px"
              pr="16px"
              borderColor="rgba(0,0,0,0)"
            >
              <Link href={"#" + topic}>{topic}</Link>
            </ListItem>
          ))}
        </List>
      </Box>
    </Box>
  );
};

function monitorScroll(mainElems: HTMLCollectionOf<Element>) {
  const observerOptions = {
    root: null,
    rootMargin: "0px",
    threshold: 0.6,
  };
  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        const id = entry.target.innerHTML + "-sidebar-item";
        const sidenavItem = document.getElementById(id);
        sidenavItem.classList.add("sidebar-inview");
      } else {
        const id = entry.target.innerHTML + "-sidebar-item";
        const sidenavItem = document.getElementById(id);
        sidenavItem.classList.remove("sidebar-inview");
      }
    });
  }, observerOptions);

  for (let i = 0, length = mainElems.length; i < length; i++) {
    if (mainElems[i]) {
      observer.observe(mainElems[i]);
    }
  }
}


export default Sidebar;
