import { Document, Page, Text, View, StyleSheet } from '@react-pdf/renderer';

const NoteListPDF = ({ notes }) => {
  const styles = StyleSheet.create({
    page: {
      flexDirection: 'column',
      backgroundColor: '#E4E6EF',
      padding: 20,
    },
    section: {
      margin: 10,
      padding: 10,
      flexGrow: 1,
    },
    header: {
      fontSize: 18,
      fontWeight: 'bold',
      marginBottom: 20,
    },
    table: {
      display: 'table',
      width: 'auto',
      borderStyle: 'solid',
      borderWidth: 1,
      borderRightWidth: 0,
      borderBottomWidth: 0,
    },
    tableRow: {
      margin: 'auto',
      flexDirection: 'row',
    },
    tableCol: {
      width: '15%',
      borderStyle: 'solid',
      borderWidth: 1,
      borderLeftWidth: 0,
      borderTopWidth: 0,
      padding: 5,
    },
  });

  return (
    <Document>
      <Page size="A4" style={styles.page}>
        <View style={styles.section}>
          <Text style={styles.header}>Notas</Text>
          <View style={styles.table}>
            <View style={styles.tableRow}>
              <Text style={styles.tableCol}>N°</Text>
              <Text style={styles.tableCol}>Alumno</Text>
              <Text style={styles.tableCol}>Asignatura</Text>
              <Text style={styles.tableCol}>Tema</Text>
              <Text style={styles.tableCol}>Tipo</Text>
              <Text style={styles.tableCol}>Nota</Text>
            </View>
            {notes.map((note, index) => (
              <View style={styles.tableRow} key={index}>
                <Text style={styles.tableCol}>{index + 1}</Text>
                <Text style={styles.tableCol}>{note.students.name} {note.students.lastname}</Text>
                <Text style={styles.tableCol}>{note.subject.name}</Text>
                <Text style={styles.tableCol}>{note.assignment.name}</Text>
                <Text style={styles.tableCol}>{note.assignment.tipo}</Text>
                <Text style={styles.tableCol}>{note.ponderacion}</Text>
              </View>
            ))}
          </View>
        </View>
      </Page>
    </Document>
  );
};

export default NoteListPDF;