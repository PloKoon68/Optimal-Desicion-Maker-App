import React, { useState, useEffect, useRef } from 'react';
import { classNames } from 'primereact/utils';
import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';
import { Toast } from 'primereact/toast';
import { Button } from 'primereact/button';
import { FileUpload } from 'primereact/fileupload';
import { Rating } from 'primereact/rating';
import { Toolbar } from 'primereact/toolbar';
import { InputTextarea } from 'primereact/inputtextarea';
import { IconField } from 'primereact/iconfield';
import { InputIcon } from 'primereact/inputicon';
import { RadioButton } from 'primereact/radiobutton';
import { InputNumber } from 'primereact/inputnumber';
import { Dialog } from 'primereact/dialog';
import { InputText } from 'primereact/inputtext';
import { Tag } from 'primereact/tag';
import { Dropdown } from 'primereact/dropdown';
import { FloatLabel } from 'primereact/floatlabel';

export default function DecisionMatrix({criteriaCards, products, setProducts}) {

    const tableColor = "rgb(226, 243, 132)"
    let emptyProduct;
    const [alternativeNames, setAlternativeNames] = useState(new Set());

    
    emptyProduct = {
        alternativeName: ""
    };
    criteriaCards.map((card) => {
        emptyProduct[card.criteriaName] = ""
    })


    const [productDialog, setProductDialog] = useState(false);
    const [deleteProductDialog, setDeleteProductDialog] = useState(false);
    const [deleteProductsDialog, setDeleteProductsDialog] = useState(false);
    const [product, setProduct] = useState(emptyProduct);
    const [selectedProducts, setSelectedProducts] = useState(null);
    const [submitted, setSubmitted] = useState(false);
    const [globalFilter, setGlobalFilter] = useState(null);

    const toast = useRef(null);
    const dt = useRef(null);



    
   

    const openNew = () => {
        setProduct(emptyProduct);
        setSubmitted(false);
        setProductDialog(true);
    };

    const hideDialog = () => {
        setSubmitted(false);
        setProductDialog(false);
    };

    const hideDeleteProductDialog = () => {
        setDeleteProductDialog(false);
    };

    const hideDeleteProductsDialog = () => {
        setDeleteProductsDialog(false);
    };


    const saveProduct = () => {

        let n = criteriaCards.length;
        product.alternativeName = product.alternativeName.trim()
        let blankExists = product.alternativeName === "" || alternativeNames.has(product.alternativeName)
        
        
        //check if categorical variables are empty
        if(!blankExists)
            for(let i = 0; i < n; i++) {
                let card = criteriaCards[i];
                if(card.dataType === "Categorical") 
                    product[card.criteriaName] = product[card.criteriaName]
                if(!product[card.criteriaName]) {
                    blankExists = true;
                    break;
                }
            }

        if(!blankExists){
            let _products = [...products];
            if (product.id) {
                const index = findIndexById(product.id);

                _products[index] = product;
                toast.current.show({ severity: 'success', summary: 'Successful', detail: 'Product Updated', life: 3000 });
            } else {
                product.id = createId();
                _products.push(product);
                toast.current.show({ severity: 'success', summary: 'Successful', detail: 'Product Created', life: 3000 });
            }

            alternativeNames.add(product.alternativeName)
            setAlternativeNames(alternativeNames)

            setProducts(_products);
            setProductDialog(false);
            setProduct(emptyProduct);
        }
        setSubmitted(true);
    };

    const editProduct = (product) => {
        alternativeNames.delete(product.alternativeName)
        setAlternativeNames(alternativeNames)

        setProduct({ ...product });
        setProductDialog(true);
    };

    const confirmDeleteProduct = (product) => {
        setProduct(product);
        setDeleteProductDialog(true);
    };

    const deleteProduct = () => {
        let _products = products.filter((val) => val.id !== product.id);

        alternativeNames.delete(product.alternativeName)

        setProducts(_products);
        setDeleteProductDialog(false);
        setProduct(emptyProduct);
        toast.current.show({ severity: 'success', summary: 'Successful', detail: 'Product Deleted', life: 3000 });
    };

    const findIndexById = (id) => {
        let index = -1;

        for (let i = 0; i < products.length; i++) {
            if (products[i].id === id) {
                index = i;
                break;
            }
        }

        return index;
    };

    const createId = () => {
        let id = '';
        let chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';

        for (let i = 0; i < 5; i++) {
            id += chars.charAt(Math.floor(Math.random() * chars.length));
        }

        return id;
    };

    const exportCSV = () => {
        dt.current.exportCSV();
    };

    const confirmDeleteSelected = () => {
        setDeleteProductsDialog(true);
    };

    const deleteSelectedProducts = () => {
        let _products = products.filter((val) => !selectedProducts.includes(val));

        selectedProducts.map((pd) => alternativeNames.delete(pd.alternativeName))        

        setProducts(_products);
        setDeleteProductsDialog(false);
        setSelectedProducts(null);
        toast.current.show({ severity: 'success', summary: 'Successful', detail: 'Products Deleted', life: 3000 });
    };

  

    const onInputChange = (e, name) => {
        const val = e.target? e.target.value: e.value;
        let _product = { ...product };
        _product[`${name}`] = val;

        setProduct(_product);
    };

    const onInputNumberChange = (e, name) => {
        const val = e.value || 0;
        let _product = { ...product };

        _product[`${name}`] = val;

        setProduct(_product);
    };

    const leftToolbarTemplate = () => {
        return (
            <div className="flex flex-wrap gap-2">
                <Button label="New" icon="pi pi-plus" style={{fontSize: "23px"}} severity="success" onClick={openNew} />
                <Button label="Delete" icon="pi pi-trash" style={{fontSize: "23px"}} severity="danger" onClick={confirmDeleteSelected} disabled={!selectedProducts || !selectedProducts.length} />
            </div>
        );
    };

    const rightToolbarTemplate = () => {
        return <Button label="Export" icon="pi pi-upload" className="p-button-help" style={{ backgroundColor: "rgb(200, 148, 230)", borderColor: "blue", color: "white", fontSize: "23px" }} onClick={exportCSV} />;
    };


    const actionBodyTemplate = (rowData) => {
        return (
            <React.Fragment>
                <Button icon="pi pi-pencil" rounded outlined className="mr-2" onClick={() => editProduct(rowData)} />
                <Button icon="pi pi-trash" rounded outlined severity="danger" onClick={() => confirmDeleteProduct(rowData)} />
            </React.Fragment>
        );
    };

    const header = (
        <div className="flex flex-wrap gap-2 align-items-center justify-content-between" style={{backgroundColor: tableColor}}>
            <h4 className="m-0" style={{  }}>Decision Matrix</h4>
            <IconField iconPosition="left">
                <InputIcon className="pi pi-search" />
                <InputText type="search" onInput={(e) => setGlobalFilter(e.target.value)} placeholder="Search..." />
            </IconField>
        </div>
    );
    const productDialogFooter = (
        <React.Fragment>
            <Button label="Cancel" icon="pi pi-times" outlined onClick={hideDialog} />
            <Button label="Save" icon="pi pi-check" onClick={saveProduct} />
        </React.Fragment>
    );
    const deleteProductDialogFooter = (
        <React.Fragment>
            <Button label="No" icon="pi pi-times" outlined onClick={hideDeleteProductDialog} />
            <Button label="Yes" icon="pi pi-check" severity="danger" onClick={deleteProduct} />
        </React.Fragment>
    );
    const deleteProductsDialogFooter = (
        <React.Fragment>
            <Button label="No" icon="pi pi-times" outlined onClick={hideDeleteProductsDialog} />
            <Button label="Yes" icon="pi pi-check" severity="danger" onClick={deleteSelectedProducts} />
        </React.Fragment>
    );


    return (
        <div style={{marginTop: "90px", backgroundColor: tableColor}}>
            <Toast ref={toast} style={{backgroundColor: tableColor}}/>
            <div className="card" style={{backgroundColor: tableColor}}>
                <Toolbar style={{backgroundColor: tableColor}} className="mb-4" left={leftToolbarTemplate} right={rightToolbarTemplate}></Toolbar>

                <DataTable ref={dt} value={products} selection={selectedProducts} onSelectionChange={(e) => setSelectedProducts(e.value)}
                        dataKey="id"  paginator rows={10} rowsPerPageOptions={[5, 10, 25]}
                        paginatorTemplate="FirstPageLink PrevPageLink PageLinks NextPageLink LastPageLink CurrentPageReport RowsPerPageDropdown"
                        currentPageReportTemplate="Showing {first} to {last} of {totalRecords} products" globalFilter={globalFilter} header={header} 
                        style={{fontSize: "25px", backgroundColor: tableColor}}>
                    
                    <Column style={{backgroundColor: tableColor}} selectionMode="multiple" exportable={false}></Column>
                    <Column field="alternativeName" header="Alternative Name" sortable style={{ backgroundColor: tableColor, minWidth: '12rem' }}></Column>
                    {criteriaCards.map((card, i) => {return <Column key={i} field={card.criteriaName} header={card.criteriaName} sortable style={{ backgroundColor: tableColor, minWidth: '12rem' }}></Column>})}
                    <Column body={actionBodyTemplate} exportable={false} style={{ backgroundColor: tableColor, minWidth: '8rem' }}></Column>

                </DataTable>
            </div>

            <Dialog visible={productDialog} style={{ width: '32rem', backgroundColor: tableColor }} breakpoints={{ '960px': '75vw', '641px': '90vw' }} header="Product Details" modal className="p-fluid" footer={productDialogFooter} onHide={hideDialog}>
                
                <div className="field">
                    <label htmlFor="alternativeName" className="font-bold">
                        Alternative name
                    </label>
                    <InputText id="alternativeName" value={product.alternativeName} onChange={(e) => onInputChange(e, "alternativeName")} required autoFocus className={classNames({ 'p-invalid': submitted && (!product.alternativeName || alternativeNames.has(product.alternativeName)) })} />
                    {submitted && productDialog && (!product.alternativeName && <small className="p-error">Alternative name is required.</small> || alternativeNames.has(product.alternativeName) && <small className="p-error">Alternative name already exists!</small>)}
                </div>
                
                {criteriaCards.map((card, i) => {
                    return card.dataType === "Numerical"? 
                    (
                        <div key={i} className="field">
                            <label htmlFor={i} className="font-bold">
                                {card.criteriaName}
                            </label>
                            <InputNumber id={i} min={1} value={product[card.criteriaName]} onChange={(e) => onInputChange(e, card.criteriaName)} required autoFocus className={classNames({ 'p-invalid': submitted && !product[card.criteriaName]})}/>
                            {submitted && productDialog && !product[card.criteriaName] && <small className="p-error">{card.criteriaName} is required.</small>}
                        </div>
                    ):
                    (
                        

                        <div key={i} className="field">
                            <label htmlFor={i} className="font-bold">
                                {card.criteriaName}
                            </label>
                            {console.log("heere: ", card)}
                            <Dropdown id={i} value={product[card.criteriaName]} onChange={(e) => onInputChange(e, card.criteriaName)} options={card.categories.map(category => category.categoryName)} optionLabel="name" className={classNames({ 'p-invalid': submitted && !product[card.criteriaName] })} />
                            {submitted && productDialog && !product[card.criteriaName] && <small className="p-error">{card.criteriaName} is required.</small>}
                        </div>
                    )
                })}

                <Column body={actionBodyTemplate} exportable={false} style={{ minWidth: '8rem' }}></Column>

    
            </Dialog>

            <Dialog visible={deleteProductDialog} style={{ width: '32rem' }} breakpoints={{ '960px': '75vw', '641px': '90vw' }} header="Confirm" modal footer={deleteProductDialogFooter} onHide={hideDeleteProductDialog}>
                <div className="confirmation-content">
                    <i className="pi pi-exclamation-triangle mr-3" style={{ fontSize: '3rem' }} />
                    {product && (
                        <span>
                            Are you sure you want to delete <b>{product.name}</b>?
                        </span>
                    )}
                </div>
            </Dialog>

            <Dialog visible={deleteProductsDialog} style={{ width: '32rem' }} breakpoints={{ '960px': '75vw', '641px': '90vw' }} header="Confirm" modal footer={deleteProductsDialogFooter} onHide={hideDeleteProductsDialog}>
                <div className="confirmation-content">
                    <i className="pi pi-exclamation-triangle mr-3" style={{ fontSize: '2rem' }} />
                    {product && <span>Are you sure you want to delete the selected products?</span>}
                </div>
            </Dialog>
        </div>
    );
}


