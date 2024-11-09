import { Document, Page, Text, View, StyleSheet } from '@react-pdf/renderer';

const NoteListPDF = ({ notes }) => {
  const styles = StyleSheet.create({
    page: {
      flexDirection: 'column',
      backgroundColor: '#FFFFFF',
      padding: 15,
    },
    header: {
      fontSize: 12,
      fontWeight: 'bold',
      marginBottom: 20,
      textAlign: 'center',
    },
    footer: {
      fontSize: 10,
      marginTop: 20,
      textAlign: 'center',
    },
    table: {
      display: 'table',
      width: 'auto',
      borderStyle: 'solid',
      borderWidth: 1,
      borderRightWidth: 0,
      borderBottomWidth: 0,
      fontSize:12
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
      backgroundColor: '#F2F2F2',
    },
  });
  const Header = () => (
    <View style={{ 
      marginBottom: 10,
      backgroundColor: '#6066FA',
      padding: 10,
      color: '#FFFFFF',
      fontWeight: 'bold',
      textAlign: 'center',
    }}>
      <Text style={{ 
        fontSize: 9, 
        fontWeight: 'bold', 
        textAlign: 'center',
      }}>
        Colegio XYZ
      </Text>
      <Text style={{ fontSize: 9, textAlign: 'center' }}>
        Dirección del Colegio 
      </Text>
      <Text style={{ fontSize: 9, textAlign: 'center' }}>
        Teléfono: (123) 456-7890
      </Text>
    </View>
  );

  return (
    <Document>
      <Page size="Letter" style={styles.page}>
        <Header />
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
        <Text style={styles.footer}>
          Generado el {new Date().toLocaleDateString()}
        </Text>
      </Page>
      
    </Document>
  );
};

export default NoteListPDF;