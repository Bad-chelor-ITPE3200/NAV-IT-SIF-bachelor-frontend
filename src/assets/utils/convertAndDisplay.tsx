/* formatDate to get DD.MM.YYYY */
export const formatDate = (date: Date) => {
    const day = date.getDate().toString().padStart(2, '0');
  const month = (date.getMonth() + 1).toString().padStart(2, '0');
   const year = date.getFullYear().toString();
  return `${day}.${month}.${year}`
};  

export const convertStatus = (journaltype: string) => {
    if(journaltype === "I") {
        return "UTGAAR";
    } else {
        return "AVBRUTT";
    }
}

export const displayType = (type: string) => {
    if (type === "U") {
        return "Utgående";
    } else if (type === "I") {
        return "Inngående";
    } else if (type === "N") {
        return "Notat";
    }
}

export const selectTagVariant = (journalStatus: string) => {
    switch(journalStatus.toUpperCase()){
        case("UNDER_ARBEID"):
            return "alt1"
        case("JOURNALFOERT"):
            return "info"  
        case("FERDIGSTILT"):
            return "success"
        case("EKSPEDERT"):
            return "warning"
        case("UTGAAR"):
            return "error"
        case("AVBRUTT"):
            return "error"
        default:
            return "neutral"
    }
}