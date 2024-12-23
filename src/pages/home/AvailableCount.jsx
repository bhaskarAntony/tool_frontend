import React from 'react'

function AvailableCount({open, close, isOpen}) {
  return (
    <div className="card rounded-0 h-100">
                        <div className="card-header p-2 d-flex gap-2 align-items-center justify-content-end">
                       <div className="icon">
                       <i class="bi bi-arrow-clockwise"></i>
                       </div>
                       <div className="icon" onClick={()=>{
                            isOpen?(close()):(open(2))
                       }}>
                       <i class="bi bi-arrows-angle-expand"></i>
                       </div>
                        </div>
                        <div className="card-body">
                            <h5 className="fs-5 text-secondary">Available Count</h5>
                            <hr />
                            <div className="row">
                                <div className="col-md-4">
                                    <div className="card rounded-0 text-center">
                                        <div className="card-header p-2">
                                            <p className="fs-6 mb-0">Armoury</p>
                                        </div>
                                        <div className="card-body">
                                            <h1 className="fs-3 fw-bold">48</h1>
                                        </div>
                                    </div>
                                </div>
                                <div className="col-md-4">
                                    <div className="card rounded-0  text-center">
                                        <div className="card-header p-2">
                                            <p className="fs-6 mb-0">Ammunition</p>
                                        </div>
                                        <div className="card-body">
                                        <h1 className="fs-3 fw-bold">75</h1>
                                        </div>
                                    </div>
                                </div>
                                <div className="col-md-4">
                                    <div className="card rounded-0 text-center">
                                        <div className="card-header p-2">
                                            <p className="fs-6 mb-0">Munition</p>
                                        </div>
                                        <div className="card-body">
                                        <h1 className="fs-3 fw-bold">80</h1>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
  )
}

export default AvailableCount