import React, { useRef, useMemo, useCallback, useEffect } from 'react';
import { View, Text, StyleSheet, SectionList, SafeAreaView } from 'react-native';
// Generate 1000 items divided into 10 sections
const generateData = () => {
  const sections = [];
  const itemsPerSection = 100;

  for (let i = 0; i < 10; i++) {
    const sectionData = [];
    for (let j = 0; j < itemsPerSection; j++) {
      const itemNumber = i * itemsPerSection + j + 1;
      sectionData.push({
        id: `item-${itemNumber}`,
        title: `Item ${itemNumber}`,
        description: `This is item number ${itemNumber} in section ${i + 1}`,
      });
    }
    sections.push({
      title: `Section ${i + 1}`,
      data: sectionData,
    });
  }
  return sections;
};

const Item = ({ title, description }: { title: string, description: string}) => (
  <View style={styles.item}>
    <Text style={styles.title}>{title}</Text>
    <Text style={styles.description}>{description}</Text>
  </View>
);

const SectionHeader = ({ title }: { title: string }) => (
  <View style={styles.sectionHeader}>
    <Text style={styles.sectionHeaderText}>{title}</Text>
  </View>
);

const SectionListDemo = () => {
  const sections = generateData();
  const sectionListRef: any = useRef(null);

  const ITEM_HEIGHT = 100
  const SECTION_HEADER_HEIGHT = 40

   const itemLayouts = useMemo(() => {
    const layouts: any = []
    let offset = 0

    sections.forEach((section) => {
        const headerHeight = SECTION_HEADER_HEIGHT
        // header
        layouts.push({
          length: headerHeight,
          offset,
          index: layouts.length
        })
        offset += headerHeight
        // items
        section.data.forEach(()=> {
          const contenteight = ITEM_HEIGHT
          layouts.push({
            length: contenteight,
            offset,
            index: layouts.length
          })
          offset += contenteight
        })
        // footer
        layouts.push({
          length: 0,
          offset,
          index: layouts.length
        })
      })
    return layouts
  }, [sections])

  const getItemLayout = useCallback((data: any, index: number) => {
    return itemLayouts[index]
  }, [itemLayouts])

  const handleScrollToLocation = () => {
    sectionListRef.current?.scrollToLocation({
        sectionIndex: 6,
        itemIndex: 7,
        animated: true
      });
  };

  useEffect(() => {
    setTimeout(() => {
      handleScrollToLocation()
    }, 3000)
  }, [])
  return (
    <SafeAreaView style={styles.container}>
      <SectionList
        ref={sectionListRef}
        sections={sections}
        keyExtractor={(item) => item.id}
        getItemLayout={getItemLayout}
        renderItem={({ item }) => <Item title={item.title} description={item.description} />}
        renderSectionHeader={({ section: { title } }) => <SectionHeader title={title} />}
        stickySectionHeadersEnabled={true}
      />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
  },
  item: {
    height: 100,
    backgroundColor: '#ffffff',
    padding: 20,
    marginHorizontal: 16,
    borderRadius: 8,
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    overflow: 'hidden',
  },
  title: {
    height: 40,
    fontSize: 18,
    fontWeight: 'bold',
  },
  description: {
    fontSize: 14,
    color: '#666',
  },
  sectionHeader: {
    backgroundColor: '#2196F3',
    padding: 10,
    paddingLeft: 16,
    height: 40,
  },
  sectionHeaderText: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#ffffff',
  },
  controls: {
    padding: 16,
    backgroundColor: '#fff',
    borderBottomWidth: 1,
    borderBottomColor: '#e0e0e0',
  },
  inputContainer: {
    flexDirection: 'row',
    marginBottom: 8,
  },
  input: {
    flex: 1,
    height: 40,
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 4,
    paddingHorizontal: 8,
    marginRight: 8,
  },
  button: {
    backgroundColor: '#2196F3',
    padding: 12,
    borderRadius: 4,
    alignItems: 'center',
  },
  buttonText: {
    color: '#fff',
    fontWeight: 'bold',
  },
});

export default SectionListDemo;
