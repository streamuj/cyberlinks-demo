<!--div class="wrapper row-offcanvas row-offcanvas-left"-->
    <!-- Right side column. Contains the navbar and content of the page -->
    <aside class="content-wrapper"> 
        <!-- Content Header (Page header) -->
        <section class="content-header">
            <h1><?php echo $welcome->loadPo('Skin Templates') ?><small><?php echo $welcome->loadPo('Control panel') ?></small>
            <a href="<?php echo base_url();?>publishing/add" class="btn btn-success">Add Skin</a>
            </h1>
            <ol class="breadcrumb">
                <li><a href="<?php echo base_url(); ?>"><i class="fa fa-dashboard"></i><?php echo $welcome->loadPo('Dashboard') ?></a></li>
                <li class="active"><?php echo $welcome->loadPo('Video') ?></li>
            </ol>
        </section>
                <?php echo $this->session->flashdata('message'); ?>
            <?php if (isset($error) && !empty($error)) { ?><div id="msg_div"><?php echo $error; ?></div><?php } ?>
        <!-- Main content -->
        <section class="content">
            <?php $search = $this->session->userdata('search_form');
            ?></pre>
            <div id="content">
                <!-- form start -->
                <form  method="post" action="<?php echo base_url(); ?>video/index" onsubmit="return date_check();" id="searchIndexForm" name="searchIndexForm" accept-charset="utf-8">
                    <div class="row">
                        <!-- left column -->
                        <div class="col-md-12">
                            <!-- general form elements -->
                            <div class="box box-primary collapsed-box">
                            <div class="box-header">
                            <!-- tools box -->
                            <div class="pull-right box-tools">
                                <button class="btn btn-danger btn-sm" data-widget='collapse' data-toggle="tooltip" title="Collapse"><i class="fa fa-plus"></i></button>
                            </div><!-- /. tools -->
                            <h3 class="box-title">Search Videos</h3>
                        </div>


                                    <div style="display:none;"><input type="hidden" name="_method" value="POST"/></div>

                                    <div class="box-body" style="display:none;">
                                        <div class="row">
                                            <div class="form-group col-lg-4">
                                                <div class="input text">
                                                    <label for=""><?php echo $welcome->loadPo('Title') ?></label>
                                                    <input type="text" name="content_title" id="content_title" class="form-control" value="<?php echo (isset($search['content_title'])) ? $search['content_title'] : ''; ?>" placeholder="<?php echo $welcome->loadPo('Title') ?>">
                                                </div>
                                            </div>
                                            <div class="form-group col-lg-4">
                                                <div class="input select">
                                                    <label for="searchCategory"><?php echo $welcome->loadPo('Category') ?></label>
                                                    <select name="category" class="form-control" placeholder="<?php echo $welcome->loadPo('Category') ?>" id="searchCategory">
                                                        <option value=""><?php echo $welcome->loadPo('Select') ?></option>
                                                        <?php foreach ($category as $key=>$val) { ?>
                                                            <option value="<?php echo $key; ?>" <?php
                                                            if (isset($search['category'])) {
                                                                if ($key == $search['category']) {
                                                                    echo 'selected';
                                                                }
                                                            }
                                                            ?>  ><?php echo $val ?></option>
                                                                <?php } ?>
                                                    </select>
                                                </div>
                                            </div>
                                        </div>
                                        <div class="row">
                                            <div class="form-group col-lg-4">
                                                <div class="input text">
                                                    <label for="url"><?php echo $welcome->loadPo('Start Date') ?></label>
                                                    <input type="text" class="form-control"  id="datepickerstart" name="datepickerstart" placeholder="<?php echo $welcome->loadPo('Start Date') ?>" value="<?php echo (isset($search['datepickerstart'])) ? $search['datepickerstart'] : ''; ?>" >											
                                                </div>
                                            </div>
                                            <div class="form-group col-lg-4">
                                                <div class="input text">
                                                    <label for="url"><?php echo $welcome->loadPo('End Date') ?></label>
                                                    <input type="text" class="form-control"  id="datepickerend" name="datepickerend" placeholder="<?php echo $welcome->loadPo('End Date') ?>" value="<?php echo (isset($search['datepickerend'])) ? $search['datepickerend'] : ''; ?>">
                                                </div>
                                            </div>
                                        </div>
                                    </div><!-- /.box-body -->
                                    <div class="box-footer" style="display:none;">
                                            <!--	<input type="text" id="hddstarddt" name="hddstarddt" value="<?php echo @$_POST['hddstarddt'] ?>"> -->
                                        <button type="submit" name="submit" value="Search"class="btn btn-primary"><?php echo $welcome->loadPo('Search') ?></button>
                                        <button type="submit" name="reset" value="Reset"class="btn btn-primary"><?php echo $welcome->loadPo('Reset') ?></button>
                                    </div>
                            </div><!-- /.box -->
                        </div><!--/.col (left) -->
                    </div>
                </form>    
                <div class="row">
                    <div class="col-xs-12">
                        <div class="box">
                            <div class="box-body table-responsive">
                                <table id="example2" class="table table-bordered table-striped">
                                    <thead>
                                        <tr>
                                            <th width="15px"><a href="<?php echo base_url(); ?>video/index/title/<?php echo (!empty($show_t)) ? $show_t : 'asc'; ?>"><?php echo $welcome->loadPo('Title') ?></a></th>                                            
                                            <th><a href="<?php echo base_url(); ?>video/index/category/<?php echo (!empty($show_c)) ? $show_c : 'asc'; ?>"><?php echo $welcome->loadPo('Description') ?></a></th>
                                            <th><a href="<?php echo base_url(); ?>video/index/user/<?php echo (!empty($show_u)) ? $show_u : 'asc'; ?>"><?php echo $welcome->loadPo('Dimensions') ?></a></th>
                                            <th><a href="<?php echo base_url(); ?>video/index/status/<?php echo (!empty($show_s)) ? $show_s : 'asc'; ?>"><?php echo $welcome->loadPo('Status') ?></a></th>
                                            <th><?php echo $welcome->loadPo('Preview') ?></th>
                                            <th><a href="<?php echo base_url(); ?>publishing/index/created/<?php echo (!empty($show_ca)) ? $show_ca : 'asc'; ?>"><?php echo $welcome->loadPo('Publish Date') ?></a></th>
                                            <th align="center">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<?php echo $welcome->loadPo('Action') ?></th>
                                        </tr>
                                    </thead>

                                    <tbody>
                                        <?php foreach ($result as $value) { ?>
                                        <tr id="<?php echo $value->id ?>">
                                                <td  width="350"><a href="<?php echo base_url(); ?>video/detail/<?php echo $value->id; ?>"><?php echo strlen($value->title) > 40 ?  substr($value->title,0,40).'...' : $value->title; ?></td>
                                                <td><?php echo $value->description; ?></td>
                                                <td><?php echo $value->dimension; ?></td>
                                                <td><?php if ($value->status == 1) { ?>
                                                        <img src="<?php echo base_url(); ?>assets/img/test-pass-icon.png" alt="Active" />
                                                    <?php } else { ?>
                                                        <img src="<?php echo base_url(); ?>assets/img/test-fail-icon.png" alt="Active" />
                                                    <?php } ?></td>                                            
                                                <td style='text-align:center'>                                                
                                                    <a class="prev_video" href="#myModal" data-backdrop="static" data-toggle="modal" data-img-url="<?php echo base_url().$value->path; ?>">Preview</a>                                                   
                                                </td>
                                                <td  width="120"><?php echo date('M d,Y', strtotime($value->created)); ?></td>
                                                <td  width="150"> 
                                                    <a href="<?php echo base_url(); ?>video/videoOpr/Basic?action=<?php echo base64_encode($value->id) . '&'; ?>" class="btn btn-info btn-sm"><?php echo $welcome->loadPo('Edit') ?></a>
                                                    &nbsp;
                                                    <a class="confirm" onclick="return delete_video(<?php echo $value->id; ?>, '<?php echo base_url() . 'video/deletevideo' ?>', '<?php echo current_full_url(); ?>');" href="" ><button class="btn btn-danger btn-sm" data-toggle="modal" data-target=".bs-example-modal-sm" ><?php echo $welcome->loadPo('Delete') ?></button></a>                            </td>
                                            </tr>
                                        <?php } ?>
                                    </tbody>


                                </table>
                                <!-- Pagination start --->
                                <?php
                                if ($this->pagination->total_rows == '0') {
                                    echo "<tr><td colspan=\"7\"><h4>" . $welcome->loadPo('No Record Found') . "</td></tr></h4>";
                                } else {
                                    ?>
                                    </table>

                                    <div class="row pull-left">
                                        <div class="dataTables_info" id="example2_info"><br>
                                            <?php
                                            $param = $this->pagination->cur_page * $this->pagination->per_page;
                                            if ($param > $this->pagination->total_rows) {
                                                $param = $this->pagination->total_rows;
                                            }
                                            if ($this->pagination->cur_page == '0') {
                                                $param = $this->pagination->total_rows;
                                            }
                                            $off = $this->pagination->cur_page;
                                            if ($this->pagination->cur_page > '1') {
                                                $off = (($this->pagination->cur_page * '10') - 9);
                                            }
                                            echo "&nbsp;&nbsp;Showing <b>" . $off . "-" . $param . "</b> of <b>" . $this->pagination->total_rows . "</b> total results";
                                        }
                                        ?>
                                    </div>
                                </div>	
                                <div class="row pull-right">
                                    <div class="col-xs-12">
                                        <div class="dataTables_paginate paging_bootstrap">
                                            <ul class="pagination"><li><?php echo $welcome->loadPo($links); ?></li></ul> 
                                        </div>
                                    </div>
                                </div>
                            </div>		
                            <!-- Pagination end -->
                        </div><!-- /.box-body -->
                    </div><!-- /.box -->
                </div>
            </div>
            </div>
        </section><!-- /.content -->
    </aside><!-- /.right-side -->
<!--/div--><!-- ./wrapper -->

<!-- Model player  -->
<div class="modal fade" id="playerModel" tabindex="-1" role="dialog" aria-labelledby="myModalLabel" aria-hidden="true">
    <div class="modal-dialog">
        <div class="modal-content">
            <div class="modal-header">
                <button type="button" class="close" data-dismiss="modal"><span aria-hidden="true">&times;</span><span class="sr-only">Close</span></button>
                <h4 class="modal-title" id="myModalLabel">Modal title</h4>
            </div>
            <div class="modal-body"><div align="center" id="jsplayer"></div></div>
        </div>
    </div>
</div>

<script>
</script>
<!--  this div for  jwplyer reponce -->
<div class="modal fade" id="myModal" tabindex="-1" role="dialog" 
     aria-labelledby="myModalLabel" aria-hidden="true">
    <div class="modal-dialog">
        <div class="modal-content">
            <div class="modal-header">
                <button type="button" class="close" 
                        data-dismiss="modal" aria-hidden="true" onclick='stopvideo("prevElement")'>
                    &times;
                </button>
                <h4 class="modal-title" id="myModalLabel">
                    Preview
            </div>
            <div class="modal-body no-padding">        
                <center>   <div id="prevElement"></div></center>
            </div>
        </div><!-- /.modal-content -->
    </div><!-- /.modal -->
</div> 
